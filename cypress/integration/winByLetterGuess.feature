Feature: Win By Letter Guess

    Scenario: User wins game by guessing letter by letter

        Given I enter the homepage
        When I write the word "palabra"
            And I click on send button
            And I guess the letter "p"
            And I click on guess button
            And I guess the letter "a"
            And I click on guess button
            And I guess the letter "l"
            And I click on guess button
            And I guess the letter "b"
            And I click on guess button
            And I guess the letter "r"
            And I click on guess button 
        Then I should win