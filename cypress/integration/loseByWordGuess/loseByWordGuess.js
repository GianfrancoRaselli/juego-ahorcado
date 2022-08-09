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

And('I guess the word {string}', (word) => {
    cy.get('input[id="arriesgar"]').type(word)
})

And('I click on guess button', () => {
    cy.get('button[id="buttonArriesgar"]').click()
})

Then('I should lose', () => {
    cy.contains('Perdiste')
    cy.get('button[id="buttonRestart"]').click()
})