import asyncio
import random
import string
import uuid

import uvicorn
from colorama import Fore, Style, init
from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect, status

init()
app = FastAPI()
active_connections = {}
client_counter = 0


def generate_random_string(length):
    return "".join(random.choices(string.ascii_letters + string.digits, k=length))


def generate_client_alias():
    client_counter = len(active_connections)
    return f"client{client_counter}"


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    client_id = str(uuid.uuid4())
    client_alias = generate_client_alias()
    active_connections[client_alias] = (client_id, websocket)
    print(
        Fore.GREEN
        + f"Client {client_alias} connected with ID: {client_id}"
        + Style.RESET_ALL
    )
    try:
        while True:
            await asyncio.sleep(0.2)
    except WebSocketDisconnect:
        del active_connections[client_alias]
        print(Fore.RED + f"Client {client_id} disconnected" + Style.RESET_ALL)
    except Exception as e:
        print(Fore.RED + f"WebSocket error: {str(e)}" + Style.RESET_ALL)
        await websocket.close()


@app.post("/push-data/{client_alias}")
async def push_data(client_alias: str):
    if client_alias not in active_connections:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Client not found"
        )

    client_id, websocket = active_connections[client_alias]

    transaction_data = generate_fake_transaction()

    try:
        await websocket.send_json(transaction_data)
    except WebSocketDisconnect:
        del active_connections[client_alias]
        return {"message": f"Client {client_alias} disconnected. Data could not be pushed."}
    except Exception as e:
        return {"message": f"Error sending data: {str(e)}"}

    return {"message": "Data pushed successfully"}


def random_id(digits=8):
    return "".join(random.choices(string.digits, k=digits))


def random_string(length=6):
    return "".join(random.choices(string.ascii_uppercase + string.digits, k=length))


def generate_fake_transaction():
    merchant_id = random_id()
    transaction_id = random_id()

    num_items = random.randint(1, 5)

    items = []
    for _ in range(num_items):
        item_name = random_string()
        item_price = round(random.uniform(1.00, 20.00), 2)
        items.append({"name": item_name, "price": item_price})

    total_amount = sum(item["price"] for item in items)

    transaction_data = {
        "merchant_id": merchant_id,
        "transaction_id": transaction_id,
        "items": items,
        "total_amount": round(total_amount, 2),
    }
    return transaction_data


def start_server():
    uvicorn.run("server:app", host="0.0.0.0", port=8000)


if __name__ == "__main__":
    start_server()
