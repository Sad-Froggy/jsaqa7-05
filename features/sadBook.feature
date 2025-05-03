Feature: failing booking due to booking a taken seet
Scenario: Should not book an already taken seet
Given user is on "/movieList" page 
When user selects a session with taken seets by date and time
When user tries to select a taken seet
Then user cant book a seet