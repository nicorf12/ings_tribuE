Feature: Load hours

    Rule: Load hours succesfully
        Scenario: Load hours succesfully
            Given A user logged in with the id "1234" and name "Admin"
            When I load hours for the project "Project A" on the date "2024-11-12" in the task "Task 1" with 8 hours
            Then the hours should be loaded



    Rule: Load hours unsuccesfully
        Scenario Outline: Load hours with different inputs
            Given I am a user and I want to load hours in a task
            When I load hours for the project <Project> on the date <Date> in the task <Task> with <Hours> hours
            Then I should see <ResultMessage>
            And the hours should <Status>

            Examples:
                | Project     | Date         | Task     | Hours | ResultMessage                      | Status        |
                | ""          | "2024-11-12" | "Task 1" | 8     | "Project is required"              | not be loaded |
                | "Project C" | "2024-11-12" | ""       | 8     | "Task is required"                 | not be loaded |
                | "Project D" | "2024-11-12" | "Task 3" | -5    | "Hours must be a positive number"  | not be loaded |
                | "Project E" | "2024-11-12" | "Task 4" | 1000  | "The number of hours is too high"  | not be loaded |
                | "Project F" | "2025-11-12" | "Task 5" | 8     | "The date cannot be in the future" | not be loaded |
                | "Project G" | "2024-11-12" | "Task 6" | 0     | "Hours must be a positive number"  | not be loaded |
