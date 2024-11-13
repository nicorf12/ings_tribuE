Feature: Weekly user report

    Feature Description

    Rule: Weekly user report success
        Scenario: User report is generated successfully
            Given A user logged in with the id "1234" and name "Admin"
            When I load hours for the project "Project A" on the date "2024-11-12" in the task "Task 1" with 8 hours
            And the user requests to generate a report for the week of "2024-11-12"
            Then the user should receive a report with the loaded hours for the week of "2024-11-12"
            And the user should see the total hours loaded for the week of "2024-11-12" is 8

        Scenario: User report is generated successfully without hours loaded
            Given A user logged in with the id "1234" and name "Admin"
            When the user requests to generate a report for the week of "2024-11-12"
            Then the user should receive a report with the loaded hours for the week of "2024-11-12"
            And the user should see the total hours loaded for the week of "2024-11-12" is 0


    Rule: Weekly user report failure
        Scenario: User report is not generated successfully for invalid week
            Given A user logged in with the id "1234" and name "Admin"
            When the user requests to generate a report for the week of "2025-11-12"
            Then the user should receive an error message "Invalid date : The date cannot be in the future"
