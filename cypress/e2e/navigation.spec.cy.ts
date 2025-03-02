describe('Navigation Tests', () => {
  beforeEach(() => {
    cy.viewport('macbook-15');
  });

  describe('Unauthenticated Navigation', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('should show correct navigation items', () => {
      cy.contains('Sign In').should('be.visible');
      cy.contains('Sign Up').should('be.visible');
      cy.contains('Home').should('be.visible');
      
      // Verify authenticated-only links are not visible
      cy.contains('Add Job').should('not.exist');
      cy.contains('Your Applications').should('not.exist');
      cy.contains('Profile').should('not.exist');
      cy.contains('Logout').should('not.exist');
    });

    it('should navigate to auth pages', () => {
      cy.contains('Sign In').click();
      cy.url().should('include', '/Login');
      
      cy.visit('/');
      cy.contains('Sign Up').click();
      cy.url().should('include', '/Register');
    });
  });

  describe('Job Seeker Navigation', () => {
    beforeEach(() => {
      cy.visit('/Login');
      cy.get('input[name="email"]').type('seeker@gmail.com');
      cy.get('input[name="password"]').type('123123');
      cy.get('button[type="submit"]').click();
      cy.location("pathname").should("eq", "/");
    });

    it('should show correct navigation items', () => {
      cy.contains('Your Applications').should('be.visible');
      cy.contains('Profile').should('be.visible');
      cy.contains('Logout').should('be.visible');
      cy.contains('Home').should('be.visible');
      
      // Employer-specific links should not be visible
      cy.contains('Add Job').should('not.exist');
    });

    it('should navigate to profile', () => {
      cy.contains('Profile').click();
      cy.url().should('include', '/Profile');
    });

    it('should navigate to applications', () => {
      cy.contains('Your Applications').click();
      cy.url().should('include', '/All');
    });
  });

  describe('Employer Navigation', () => {
    beforeEach(() => {
      cy.visit('/Login');
      cy.get('input[name="email"]').type('a@gmail.com');
      cy.get('input[name="password"]').type('123123');
      cy.get('button[type="submit"]').click();
      cy.location("pathname").should("eq", "/");
    });

    it('should show correct navigation items', () => {
      cy.contains('Add Job').should('be.visible');
      cy.contains('Your Applications').should('be.visible');
      cy.contains('Profile').should('be.visible');
      cy.contains('Logout').should('be.visible');
      cy.contains('Home').should('be.visible');
    });

    it('should navigate to job creation', () => {
      cy.contains('Add Job').click();
      cy.url().should('include', '/Create');
    });

    it('should navigate to received applications', () => {
      cy.contains('Your Applications').click();
      cy.url().should('include', '/All');
    });
  });

  
});
