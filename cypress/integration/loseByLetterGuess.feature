Feature: Lose By Letter Guess

    Scenario: User loses game by guessing letter by letter

        Given I enter the homepage
        When I write the word "palabra"
            And I click on send button
            And I guess the letter "s"
            And I click on guess button
            And I guess the letter "e"
            And I click on guess button
            And I guess the letter "c"
            And I click on guess button
            And I guess the letter "w"
            And I click on guess button
            And I guess the letter "x"
            And I click on guess button
            And I guess the letter "z"
            And I click on guess button
            And I guess the letter "k"
            And I click on guess button 
        Then I should lose