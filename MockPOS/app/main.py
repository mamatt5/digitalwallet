import asyncio
import random
import string
import threading
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
    global client_counter
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
            await asyncio.sleep(0.1)
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

    _, websocket = active_connections[client_alias]

    transaction_data = {
        "merchant_id": generate_random_string(8),
        "transaction_amount": round(random.uniform(1, 100), 2),
        "description": f"Mock transaction {generate_random_string(4)}",
    }

    await websocket.send_json(transaction_data)

    return {"message": "Data pushed successfully"}


def command_line_interface():
    print(Fore.YELLOW + "=== Mock POS System CLI ===" + Style.RESET_ALL)
    while True:
        command = input(
            Fore.BLUE
            + "Enter a command (list, push <client_id>, quit): "
            + Style.RESET_ALL
        )
        if command == "list":
            print(Fore.CYAN + "Active connections:" + Style.RESET_ALL)
            for client_id in active_connections:
                print(Fore.CYAN + client_id + Style.RESET_ALL)
        elif command.startswith("push"):
            parts = command.split(" ")
            if len(parts) != 2:
                print(
                    Fore.RED
                    + "Invalid command. Usage: push <client_id>"
                    + Style.RESET_ALL
                )
            else:
                client_id = parts[1]
                asyncio.run(push_data(client_id))
                print(
                    Fore.GREEN + f"Data pushed to client {client_id}" + Style.RESET_ALL
                )
        elif command == "quit":
            print(
                Fore.YELLOW + "Shutting down the Mock POS System..." + Style.RESET_ALL
            )
            uvicorn.Server.should_exit = True
            uvicorn.Server.force_exit = True
            break
        else:
            print(
                Fore.RED
                + "Invalid command. Available commands: list, push <client_id>, quit"
                + Style.RESET_ALL
            )


if __name__ == "__main__":
    threading.Thread(target=command_line_interface).start()
    uvicorn.run(app, host="0.0.0.0", port=8000)
