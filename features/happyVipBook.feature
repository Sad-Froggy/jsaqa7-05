Feature: booking a VIP seet
Scenario: Should book a first available vip seet
Given user is on "/movieList" page 
When user selects a session by date and time
When user books a VIP seet
Then user sees the chosen seets conformation "Вы выбрали билеты:"