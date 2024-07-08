from behave import given, when, then
from selenium import webdriver
from selenium.webdriver.common.by import By

@given('I open the login page')
def step_open_login_page(context):
    context.browser.get('http://localhost:5173/login')

@when('I enter valid credentials')
def step_enter_credentials(context):
    context.browser.find_element(By.ID, 'username').send_keys('valid_username')
    context.browser.find_element(By.ID, 'password').send_keys('valid_password')

@when('I click the login button')
def step_click_login(context):
    context.browser.find_element(By.CLASS_NAME, 'login-register-button').click()

# @then('I should see the dashboard')
# def step_see_dashboard(context):
#     assert 'Dashboard' in context.browser.page_source
