import asyncio
import readline

import server
from colorama import Fore, Style, init

init()


def tab_completer(text, state):
    commands = {
        "list": [],
        "push": list(server.active_connections.keys()),
        "quit": [],
    }

    command_line = readline.get_line_buffer()
    parts = command_line.split()

    if len(parts) == 0:
        options = list(commands.keys())
    elif len(parts) == 1:
        options = [cmd for cmd in commands if cmd.startswith(text)]
    elif len(parts) == 2:
        cmd = parts[0]
        if cmd in commands:
            options = [opt for opt in commands[cmd] if opt.startswith(text)]
    else:
        options = []
            
            
    if state < len(options):
        return options[state]
    return None


readline.set_completer(tab_completer)
readline.parse_and_bind("tab: complete")


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
            for client_id in server.active_connections:
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
                client_alias = parts[1]
                asyncio.run(server.push_data(client_alias))
                print(
                    Fore.GREEN
                    + f"Data pushed to client {client_alias}"
                    + Style.RESET_ALL
                )
        elif command == "quit":
            print(
                Fore.YELLOW + "Shutting down the Mock POS System..." + Style.RESET_ALL
            )
            break
        else:
            print(
                Fore.RED
                + "Invalid command. Available commands: list, push <client_id>, quit"
                + Style.RESET_ALL
            )


def start_cli():
    command_line_interface()


if __name__ == "__main__":
    start_cli()
