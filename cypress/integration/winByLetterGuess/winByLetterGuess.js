import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I enter the homepage', () => {
    cy.visit('')
})

When('I write the word {string}', (word) => {
    cy.get('input[id="palabraAdivinar"]').type(word)
})

And('I click on send button', () => {
    cy.get('button[id="buttonEnviar"]').click()
})

And('I guess the letter {string}', (letter) => {
    cy.get('input[id="letra"]').clear().type(letter)
})

And('I click on guess button', () => {
    cy.get('div[id="letra"]').find('button').click()
})

Then('I should win', () => {
    cy.contains('Ganaste')
})