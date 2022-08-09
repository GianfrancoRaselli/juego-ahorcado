Feature: Lose By Word Guess

    Scenario: User loses game by guessing the whole word

        Given I enter the homepage
        When I write the word "palabra"
            And I click on send button
            And I guess the word "palabro"
            And I click on guess button
        Then I should lose