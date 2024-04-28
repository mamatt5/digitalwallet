from typing import Dict

from fastapi import FastAPI, WebSocket, WebSocketDisconnect

app = FastAPI()


class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}

    async def connect(self, client_id: str, websocket: WebSocket):
        await websocket.accept()
        self.active_connections[client_id] = websocket
        print(self.active_connections)

    def disconnect(self, client_id: str):
        del self.active_connections[client_id]

    async def send_to_connection(self, data: dict, client_id: str):
        websocket = self.active_connections.get(client_id)
        if websocket:
            await websocket.send_json(data)

    async def broadcast(self, data: dict):
        for websocket in self.active_connections.values():
            await websocket.send_json(data)


manager = ConnectionManager()


@app.websocket("/ws/clients/{client_id}")
async def client_websocket_endpoint(websocket: WebSocket, client_id: str):
    await manager.connect(client_id, websocket)
    try:
        while True:
            data = await websocket.receive_json()
    except WebSocketDisconnect:
        manager.disconnect(client_id)


@app.websocket("/ws/interface")
async def interface_websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_json()
            if data["type"] == "broadcast":
                await manager.broadcast(data["data"])
            elif data["type"] == "send_to_connection":
                await manager.send_to_connection(data["data"], data["client_id"])
    except WebSocketDisconnect:
        pass


@app.get("/active-clients")
async def get_active_clients():
    return {"clients": list(manager.active_connections.keys())}
