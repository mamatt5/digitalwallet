import argparse
import asyncio
from typing import List
from textual import on
from textual.binding import Binding
import aiohttp
from textual.app import App, ComposeResult
from textual.containers import Container, Grid
from textual.reactive import reactive
from textual.widgets import (
    Button,
    Footer,
    Header,
    Input,
    Label,
    ListView,
    Static,
    ContentSwitcher,
)
from textual.scroll_view import ScrollView
from rich.logging import RichHandler
import logging
from rich.text import Text


class SystemInterface(App):
    CSS_PATH = "interface.tcss"

    selected_client = reactive("")
    transaction_data = reactive({})

    BINDINGS = [
        Binding(key="q", action="quit", description="Quit"),
        Binding(key="?", action="help", description="Help"),
        Binding(key="v", action="switch_view", description="Views"),
    ]

    async def on_load(self) -> None:
        self.session = aiohttp.ClientSession()
        self.websocket = await self.setup_websocket()
        self.active_clients: List[str] = []
        logging.basicConfig(
            level=logging.DEBUG,
            format="%(message)s",
            datefmt="[%X]",
            handlers=[RichHandler(rich_tracebacks=True)],
        )
        self.logger = logging.getLogger("rich")

    async def on_unload(self) -> None:
        await self.session.close()
        await self.websocket.close()

    async def setup_websocket(self):
        websocket = await self.session.ws_connect(f"{self.server_url}/ws/interface")
        asyncio.create_task(self.handle_websocket_messages(websocket))
        return websocket

    async def handle_websocket_messages(self, websocket):
        self.logger.debug("Started handling websocket messages")
        try:
            async for msg in websocket:
                self.logger.debug(f"Received message from server: {msg}")
                data = msg.json()
                self.logger.debug(f"Parsed message data: {data}")
                if "active_clients" in data:
                    self.active_clients = data["active_clients"]
                    self.refresh_client_list()
        except Exception as e:
            self.logger.exception(
                f"Exception occurred while handling websocket messages: {e}"
            )

    def compose(self) -> ComposeResult:
        yield Header(show_clock=True, name="POS System")
        yield Footer()

        client_list = ScrollView(
            Container(
                *(
                    Button(
                        client,
                        classes="client-button",
                    )
                    for client in self.active_clients
                ),
                id="client_container",
            ),
            id="client_scroll",
        )

        transaction_preview = ScrollView(
            Static(id="transaction_preview"),
            id="transaction_preview_scroll",
        )

        log_view = ScrollView(
            Static(id="log_view"),
            id="log_scroll",
        )

        yield ContentSwitcher(
            client_list,
            transaction_preview,
            log_view,
            initial="transaction_preview_scroll",
            id="content_switcher",
        )

    async def action_switch_view(self):
        content_switcher = self.query_one("#content_switcher")
        current_view = content_switcher.current
        views = ["log_scroll", "transaction_preview_scroll", "client_scroll"]
        current_index = views.index(current_view)
        next_index = (current_index + 1) % len(views)
        content_switcher.current = views[next_index]

    def refresh_client_list(self):
        self.logger.debug("Refreshing client list")
        client_container = self.query_one("#client_container")
        for child in client_container.query("Button"):
            child.remove()
        for client in self.active_clients:
            client_container.mount(Button(client, classes="client-button"))

    async def on_list_view_selected(self, message: ListView.Selected) -> None:
        self.selected_client = message.item.label


    async def send_transaction_data(self, transaction_data, client_alias):
        data = {
            "transaction_data": transaction_data,
            "client_alias": client_alias,
        }
        try:
            self.logger.debug(f"Sending transaction data: {data}")  # Add this line
            await self.websocket.send_json(data)
            self.logger.debug(f"Sent transaction data to server for client: {client_alias}")
            self.logger.debug(f"Transaction data: {transaction_data}")
        except Exception as e:
            self.logger.exception(f"Exception occurred while sending transaction data: {e}")

    def get_transaction_data(self):
        self.logger.debug("Getting transaction data")
        transaction_data = {
            "merchant_id": "12345",
            "transaction_id": "TRX67890",
            "items": [
                {"name": "Item 1", "price": 10.99},
                {"name": "Item 2", "price": 5.99},
                {"name": "Item 3", "price": 7.50},
            ],
            "total_amount": 24.48,
        }
        return transaction_data

    @on(Button.Pressed, "#client_container Button")
    async def on_client_button_pressed(self, event: Button.Pressed) -> None:
        self.logger.debug(f"Client button pressed: {event.button.label}")
        self.selected_client = event.button.label
        transaction_data = self.get_transaction_data()
        if not transaction_data:
            self.logger.warning("No transaction data available. Cannot send to client.")
            return
        await self.send_transaction_data(transaction_data, self.selected_client)

    def on_mount(self) -> None:
        class LogHandler(logging.Handler):
            def emit(self, record):
                log_view = self.app.query_one("#log_view")
                log_view.update(Text(record.getMessage()))

        handler = LogHandler()
        handler.app = self
        self.logger.addHandler(handler)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--server-url", default="http://localhost:8000", help="Server URL"
    )
    args = parser.parse_args()

    app = SystemInterface()
    app.server_url = args.server_url
    app.run()
