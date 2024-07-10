from behave import given, when, then
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import UnexpectedAlertPresentException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

@given('I open the login page')
def step_open_login_page(context):
    context.browser.get('http://localhost:5173/login')
    time.sleep(1)

@when('I enter valid credentials')
def step_enter_valid_credentials(context):
    context.browser.find_element(By.ID, 'username').send_keys('beza@example.com')
    context.browser.find_element(By.ID, 'password').send_keys('Password1')
    time.sleep(1)

@when('I enter invalid credentials')
def step_enter_invalid_credentials(context):
    context.browser.find_element(By.ID, 'username').send_keys('randomuser')
    context.browser.find_element(By.ID, 'password').send_keys('cc')
    time.sleep(1)

@when('I click the login button')
def step_click_login(context):
    context.browser.find_element(By.CLASS_NAME, 'login-register-button').click()
    time.sleep(2)

@then('I should see the dashboard')
def step_see_dashboard(context):
    h1_element = context.browser.find_element(By.TAG_NAME, 'h1')
    assert h1_element.text == 'Dashboard', f"Expected 'Dashboard', but got '{h1_element.text}'"
    time.sleep(1)

@then('I should remain on the login page')
def step_remain_on_login_page(context):
    try:
        WebDriverWait(context.browser, 5).until(EC.alert_is_present())
        alert = context.browser.switch_to.alert
        alert_text = alert.text
        assert alert_text == "Incorrect username or password", f"Expected 'Incorrect username or password', but got '{alert_text}'"
        alert.accept()
    except TimeoutException:
        h1_element = context.browser.find_element(By.TAG_NAME, 'h1')
        assert h1_element.text == 'Welcome to PayPath Companion', f"Expected 'Welcome to PayPath Companion', but got '{h1_element.text}'"
    time.sleep(1)