Feature: login to cosec

  Scenario: validate login cases
    Given Open Cosec Web
    And Login with user
   

  Scenario: validate login cases with parametrization
    Given Open Cosec Web
    And Login with username 'sa' and pwd 'admin'

  Scenario Outline: validate login cases
    Given Open Cosec Web
    When Login with user with username "<username>" and password "<password>"
    Then validate login "<validate>"

    Examples:
      | username | password | validate |
      | sa       | admin    | valid    |
      | sa1      | admin    | Invalid  |
      | sa       | admin123 | Invalid  |
      |          |          | Invalid  |

  Scenario: validate login cases with datatable in steps
    Given Open Cosec Web
    And Login with user in cosec
      | username | password | validate |
      | sa       | admin    | valid    |
      | sa1      | admin    | Invalid  |
      | sa       | admin123 | Invalid  |
      |          |          | Invalid  |
