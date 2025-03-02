describe('Job Applications Tests', () => {
  beforeEach(() => {
    cy.viewport('macbook-15');
  });

  describe('Job Seeker Application Flow', () => {
    beforeEach(() => {
      cy.visit('/Login');
      cy.get('input[name="email"]').type('seeker@gmail.com');
      cy.get('input[name="password"]').type('123123');
      cy.get('button[type="submit"]').click();
      cy.location("pathname").should("eq", "/");
    });

    it('should navigate to application form', () => {
      cy.get('a').contains('Apply Now!').first().click();
      cy.url().should('include', '/Applying/');
    });

   

    it('should view submitted applications', () => {
      cy.contains('Your Applications').click();
      cy.url().should('include', '/All');
      // Add assertions for application list if implemented
    });
  });

  describe('Employer Application Management', () => {
    beforeEach(() => {
      cy.visit('/Login');
      cy.get('input[name="email"]').type('a@gmail.com');
      cy.get('input[name="password"]').type('123123');
      cy.get('button[type="submit"]').click();
      cy.location("pathname").should("eq", "/");
    });

    it('should not show Apply Now button', () => {
      cy.get('a').contains('Apply Now!').should('not.be.visible');
    });

    it('should view received applications', () => {
      cy.contains('Your Applications').click();
      cy.url().should('include', '/All');
    });

  });
});
