Feature: Transactions Display

  Scenario: Display transactions in data grid
    Given I am logged in
    When I navigate to the transactions page
    Then I should see a list of transactions
