import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I enter the homepage', () => {
    cy.visit('')
})

When('I write the word {string}', (word) => {
    cy.get('[id="palabraAdivinar"]').type(word)
})

And('I click on send button', () => {
    cy.get('[type="button"]').click()
})

Then('I will start playing', () => {
    cy.contains('Letras Arriesgadas:')
})