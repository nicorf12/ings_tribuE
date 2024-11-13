Feature: Edit loaded hours

    Scenario: Edit hours successfully
        Given A user logged in with the id "1234" and name "Admin"
        When I load hours for the project "Project A" on the date "2024-11-12" in the task "Task 1" with 8 hours
        And I edit the hours loaded for the project "Project A" on the date "2024-11-12" in the task "Task 1" to 6 hours
        Then the hours should be updated to 6
        And the project "Project A" should have 6 hours loaded on the date "2024-11-12" in the task "Task 1"

    Rule: Edit hours unsuccessfully

        Scenario Outline:
            Given A user logged in with the id "1234" and name "Admin"
            When I load hours for the project "Project A" on the date "2024-11-12" in the task "Task 1" with 8 hours
            And I edit the hours loaded for the project <Project> on the date <Date> in the task <Task> to <NewHours>
            Then the hours should not be updated
            And an error message should be shown "<ErrorMessage>"
            And the project <Project> should have <Hours> hours loaded on the date <Date> in the task <Task>

            Examples:
                | Project     | Date         | Task     | NewHours | Hours | ErrorMessage                     |
                | ""          | "2024-11-12" | "Task 1" | 6        | 8     | "Project name cannot be empty."  |
                | "Project A" | "2024-11-12" | ""       | 6        | 8     | "Task name cannot be empty."     |
                | "Project A" | "2024-11-12" | "Task 3" | -5       | 8     | "Hours cannot be negative."      |
                | "Project A" | "2024-11-12" | "Task 4" | 1000     | 8     | "Invalid hours value."           |
                | "Project B" | "2025-11-12" | "Task 5" | 6        | 8     | "Project not found."             |
                | "Project A" | "2024-11-12" | "Task 6" | 0        | 8     | "No hours loaded for this task." |
