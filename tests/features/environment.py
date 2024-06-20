# features/environment.py
import os
import sys
from selenium import webdriver

def before_all(context):
    print("Initializing browser")
    context.browser = webdriver.Chrome()
    context.browser.implicitly_wait(10)

    # Add steps directory to path
    sys.path.append(os.path.join(os.path.dirname(__file__), 'steps'))

def after_all(context):
    print("Quitting browser")
    context.browser.quit()
