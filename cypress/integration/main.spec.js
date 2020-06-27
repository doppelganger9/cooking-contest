// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />
/// <reference types="../support" />

describe(`Main page`, () => {

    it(`shows up with a main heading`, () => {
        cy.visit('/')
        //cy.
        cy.get('h1').should('contain', 'Concours de Cuisine')
        cy.get('header').should('be.visible')
    })

    it(`can switch lang fr to en and back`, () => {
        cy.get('h1').should('contain', 'Concours de Cuisine')
        cy.getByDataE2E('btn-i18n').should('be.visible').click()
        cy.get('h1').should('contain', 'Cooking Contest')
        cy.getByDataE2E('btn-i18n').should('be.visible').click()
        cy.get('h1').should('contain', 'Concours de Cuisine')
    })

    it(`has an animated burger menu`, () => {
        cy.getByDataE2E('side-menu').should('have.css', 'left', '-400px');
        cy.getByDataE2E('btn-burger-menu-closed').should('be.visible').click()
        cy.getByDataE2E('side-menu').should('have.css', 'left', '0px');
        cy.getByDataE2E('btn-burger-menu-opened').should('be.visible').click()
        cy.getByDataE2E('side-menu').should('have.css', 'left', '-400px');
    })
})