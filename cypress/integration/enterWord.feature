Feature: Enter Word Test

    Scenario: Enter a word to guess

        Given I enter the homepage
        When I write the word "asd"
            And I click on send button
        Then I will start playing