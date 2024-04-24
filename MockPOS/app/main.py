import threading
import cli
import server


def start_server():
    server.start_server()

def start_cli():
    cli.start_cli()

if __name__ == "__main__":
    server_thread = threading.Thread(target=start_server)
    cli_thread = threading.Thread(target=start_cli)

    server_thread.start()
    cli_thread.start()

    server_thread.join()
    cli_thread.join()
