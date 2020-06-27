declare namespace Cypress {
    interface Chainable<Subject> {
      /**
       * get something using the recommanded `data-e2e` attribute
       * @example
       * cy.getByDataE2E('btn-i18n')
       */
      getByDataE2E(): Chainable<any>
    }
  }
  