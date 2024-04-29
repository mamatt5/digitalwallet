import logging
from datetime import datetime, timezone
from pathlib import Path

import pytest
from config import TEST_DATABASE_URL
from fastapi.testclient import TestClient
from main import app
from sqlmodel import Session, SQLModel, create_engine


def configure_logging() -> logging.Logger:
    tests_dir = Path(__file__).parent
    test_logs_dir = tests_dir / "test_logs"
    test_logs_dir.mkdir(parents=True, exist_ok=True)
    timestamp = datetime.now(tz=timezone.utc).strftime("%Y%m%d_%H%M%S")
    log_file = test_logs_dir / f"test_run_{timestamp}.log"

    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(levelname)s - %(message)s",
        filename=log_file,
        filemode="w",
    )

    file_handler = logging.FileHandler(log_file)
    file_handler.setLevel(logging.INFO)
    file_handler.setFormatter(logging.Formatter("%(asctime)s - %(levelname)s - %(message)s"))

    logger = logging.getLogger()
    logger.addHandler(file_handler)

    return logger


@pytest.fixture(scope="session", autouse=True)
def setup_logging():
    logger = configure_logging()
    return logger


@pytest.fixture(scope="session", autouse=True)
def test_database_setup(request):
    engine = create_engine(TEST_DATABASE_URL)
    SQLModel.metadata.drop_all(engine)
    SQLModel.metadata.create_all(engine)
    yield engine
    SQLModel.metadata.drop_all(engine)


@pytest.fixture()
def db_session(test_database_setup):
    with Session(test_database_setup) as session:
        yield session


@pytest.fixture()
def client():
    with TestClient(app) as client:
        yield client


@pytest.fixture(autouse=True)
def rollback_transaction(db_session):
    db_session.begin()
    try:
        yield
    finally:
        db_session.rollback()


@pytest.fixture(scope="function", autouse=True)
def log_test_outcomes(request):
    logger = logging.getLogger()
    logger.info(f"Starting test: {request.node.name}")
    yield

    outcome = getattr(request.node, "rep_call", None)
    if outcome is not None:
        if outcome.failed:
            logger.error(f"Test failed: {request.node.name}")
            logger.error(f"Reason: {outcome.excinfo[1]}")
        else:
            logger.info(f"Test passed: {request.node.name}")


@pytest.hookimpl(tryfirst=True, hookwrapper=True)
def pytest_runtest_makereport(item, call):
    outcome = yield
    rep = outcome.get_result()
    setattr(item, "rep_" + call.when, rep)
