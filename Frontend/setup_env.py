import socket
from pathlib import Path


def get_local_ip() -> str:
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("10.255.255.255", 1))
        return s.getsockname()[0]
    except Exception:
        return "127.0.0.1"


local_ip = get_local_ip()

if not Path(".env", "r").exists():
    with open(".env", "w") as file:
        file.write(f"LOCAL_IP={local_ip}\n")
else:
    local_ip_found = False
    with open(".env") as file:
        for line in file:
            if line.startswith("LOCAL_IP="):
                local_ip = line.strip().split("=")[1]
                local_ip_found = True
                break
    if not local_ip_found:
        with open(".env", "a") as file:
            file.write(f"LOCAL_IP={local_ip}\n")
