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

@given('I navigate to the transactions page')
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

@when('I sort the transactions by "{column_name}"')
def step_sort_transactions(context, column_name):
    header = context.browser.find_element(By.XPATH, f'//div[@role="columnheader" and @data-field="{column_name}"]')
    header.click()
    time.sleep(2)

@then('the transactions should be sorted by "{column_name}" in ascending order')
def step_verify_sorted_transactions(context, column_name):
    cells = context.browser.find_elements(By.XPATH, f'//div[@data-field="{column_name}"]//div[@role="cell"]')
    values = [float(cell.text) for cell in cells if cell.text]
    assert values == sorted(values), f"Transactions are not sorted by {column_name}"

@when('I filter the transactions by vendor "{vendor_name}"')
def step_filter_transactions(context, vendor_name):
    filter_button = context.browser.find_element(By.XPATH, '//button[@title="Show filters"]')
    filter_button.click()
    time.sleep(1)
    vendor_filter = context.browser.find_element(By.XPATH, '//input[@placeholder="Filter value"]')
    vendor_filter.send_keys(vendor_name)
    time.sleep(2)

@then('only transactions from vendor "{vendor_name}" should be displayed')
def step_verify_filtered_transactions(context, vendor_name):
    cells = context.browser.find_elements(By.XPATH, '//div[@data-field="vendor"]//div[@role="cell"]')
    vendors = [cell.text for cell in cells]
    assert all(vendor == vendor_name for vendor in vendors), f"Not all transactions are from vendor {vendor_name}"

@when('I export the transactions as CSV')
def step_export_transactions(context):
    export_button = context.browser.find_element(By.XPATH, '//button[@title="Export"]')
    export_button.click()
    time.sleep(2)

@then('a CSV file should be downloaded')
def step_verify_csv_download(context):
    # Implement logic to verify the CSV download
    # This could involve checking the download directory for a new file
    pass