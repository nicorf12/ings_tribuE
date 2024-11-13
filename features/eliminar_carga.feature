Feature: Delete hours loaded

    Scenario: Delete hours succesfully
        Given A user logged in with the id "1234" and name "Admin"
        When I load hours for the project "Project A" on the date "2024-11-12" in the task "Task 1" with 8 hours
        And I delete the hours loaded for the project "Project A" on the date "2024-11-12" in the task "Task 1"
        Then the hours should be deleted
        And the project "Project A" should have 0 hours loaded on the date "2024-11-12" in the task "Task 1"


    Rule: Delete hours unsuccesfully

        Scenario Outline:
            Given A user logged in with the id "1234" and name "Admin"
            When I load hours for the project "Project A" on the date "2024-11-12" in the task "Task 1" with 8 hours
            And I delete the hours loaded for the project <Project> on the date <Date> in the task <Task>
            Then the hours should not be deleted
            And an error message should be shown "<ErrorMessage>"
            And the project <Project> should have <Hours> hours loaded on the date <Date> in the task <Task>

            Examples:
                | Project     | Date         | Task     | Hours | ErrorMessage                     |
                | ""          | "2024-11-12" | "Task 1" | 8     | "Project name cannot be empty."  |
                | "Project A" | "2024-11-12" | ""       | 8     | "Task name cannot be empty."     |
                | "Project A" | "2024-11-12" | "Task 3" | -5    | "Hours cannot be negative."      |
                | "Project A" | "2024-11-12" | "Task 4" | 1000  | "Invalid hours value."           |
                | "Project B" | "2025-11-12" | "Task 5" | 8     | "Project not found."             |
                | "Project A" | "2024-11-12" | "Task 6" | 0     | "No hours loaded for this task." |