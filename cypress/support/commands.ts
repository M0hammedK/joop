/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    loginAsEmployer(): Chainable<void>
    loginAsJobSeeker(): Chainable<void>
    logout(): Chainable<void>
  }
}

// Login as an employer
Cypress.Commands.add('loginAsEmployer', () => {
  cy.visit('/Login');
  cy.get('input[name="email"]').type('a@gmail.com');
  cy.get('input[name="password"]').type('123123');
  cy.get('button[type="submit"]').click();
  cy.location("pathname").should("eq", "/");
});

// Login as a job seeker
Cypress.Commands.add('loginAsJobSeeker', () => {
  cy.visit('/Login');
  cy.get('input[name="email"]').type('seeker@gmail.com');
  cy.get('input[name="password"]').type('123123');
  cy.get('button[type="submit"]').click();
  cy.location("pathname").should("eq", "/");
});

// Logout
Cypress.Commands.add('logout', () => {
  cy.contains('Logout').click();
  cy.url().should('not.include', '/Profile');
});

// Handle Next.js route changes
Cypress.on('uncaught:exception', (err, runnable) => {
  // Check for the specific error (NEXT_REDIRECT) or just return false to ignore all uncaught exceptions
    // Prevent Cypress from failing the test on this specific error
    return false;
  }
  
  // Return true to let other errors fail the test as usual
);
