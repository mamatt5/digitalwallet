import asyncio
from typing import Dict

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from pydantic import BaseModel

app = FastAPI()
client_alias_map: Dict[str, WebSocket] = {}


class TransactionData(BaseModel):
    merchant_id: str
    transaction_id: str
    items: list
    total_amount: float


def generate_client_alias():
    client_alias = f"client{len(client_alias_map)}"
    return client_alias

@app.websocket("/ws/interface")
async def interface_websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            await asyncio.sleep(1.0)
            active_clients = list(client_alias_map.keys())
            print(f"Sending active clients: {active_clients}")
            await websocket.send_json({"active_clients": active_clients})
    except WebSocketDisconnect:
        pass

@app.websocket("/ws/client")
async def client_websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    client_alias = generate_client_alias()
    client_alias_map[client_alias] = websocket
    try:
        while True:
            data = await websocket.receive_json()
            if "transaction_data" in data:
                transaction_data = data["transaction_data"]
                target_client_alias = data["client_alias"]
                print(f"Received transaction data from interface for client: {target_client_alias}")
                print(f"Transaction data: {transaction_data}")
                if target_client_alias in client_alias_map:
                    target_websocket = client_alias_map[target_client_alias]
                    await target_websocket.send_json(transaction_data)
                    print(f"Sent transaction data to client: {target_client_alias}")
                else:
                    print(f"Client {target_client_alias} not found in client_alias_map")
    except WebSocketDisconnect:
        del client_alias_map[client_alias]
    except Exception as e:
        print(f"Exception occurred in client_websocket_endpoint: {e}")
        await websocket.close()
