Feature: User login

  Scenario: Unsuccessful login with invalid credentials
    Given I open the login page
    When I enter invalid credentials
    And I click the login button
    Then I should remain on the login page

  Scenario: Successful login with valid credentials
    Given I open the login page
    When I enter valid credentials
    And I click the login button
    Then I should see the dashboard
