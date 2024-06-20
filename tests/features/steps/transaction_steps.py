# features/steps/transaction_steps.py
from behave import given, when, then
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

@given('I am logged in')
def step_am_logged_in(context):
    context.execute_steps("""
        Given I open the login page
        When I enter valid credentials
        And I click the login button
    """)

@when('I navigate to the transactions page')
def step_navigate_to_transactions_page(context):
    context.browser.get('http://localhost:5173/transactions')

@then('I should see a list of transactions')
def step_should_see_transactions(context):
    wait = WebDriverWait(context.browser, 10000)
    transactions = wait.until(
        EC.presence_of_all_elements_located((By.CLASS_NAME, 'MuiDataGrid-row'))
    )
    assert len(transactions) > 0, "No transactions found in the data grid"
    time.sleep(1)