Feature: Transactions Display

  Scenario: Display transactions in data grid
    Given I am logged in
    When I navigate to the transactions page
    Then I should see a list of transactions

  Scenario: Sort transactions by amount
    Given I am logged in
    And I navigate to the transactions page
    When I sort the transactions by "amount"
    Then the transactions should be sorted by "amount" in ascending order

  Scenario: Filter transactions by vendor
    Given I am logged in
    And I navigate to the transactions page
    When I filter the transactions by vendor "Example 1"
    Then only transactions from vendor "Example 1" should be displayed

  Scenario: Export transactions as CSV
    Given I am logged in
    And I navigate to the transactions page
    When I export the transactions as CSV
    Then a CSV file should be downloaded