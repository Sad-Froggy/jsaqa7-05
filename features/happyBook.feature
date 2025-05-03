Feature: booking a standart seet
Scenario: Should book a first available seet
Given user is on "/movieList" page 
When user selects a session by date and time
When user books a seet
Then user sees the chosen seets conformation "Вы выбрали билеты:"