describe('Authentication Tests', () => {
  it('should login successfully with valid credentials', () => {
    cy.visit('/Login'); // Adjusted to lowercase
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123'); // Updated selector
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/profile/continue'); // Updated assertion
  });

  it('should fail login with invalid credentials', () => {
    cy.visit('/Login'); // Adjusted to lowercase
    cy.get('input[type="email"]').type('invalid@example.com');
    cy.get('input[type="password"]').type('wrongpassword'); // Updated selector
    cy.get('button[type="submit"]').click();
    cy.contains('Invalid User'); // Adjust the expected error message
  });

  it('should register successfully with valid data', () => {
    cy.visit('/Register'); // Adjusted to lowercase
    cy.get('input[type="email"]').type('newuser@example.com');
    cy.get('input[type="password"]').type('password123'); // Updated selector
    cy.get('button[type="submit"]').click();
    cy.contains('Registration successful'); // Adjust the expected success message
  });

  it('should fail registration with invalid data', () => {
    cy.visit('/Register'); // Adjusted to lowercase
    cy.get('input[type="email"]').type('invalidemail');
    cy.get('input[type="password"]').type('123'); // Invalid password
    cy.get('button[type="submit"]').click();
    cy.contains('Invalid email format'); // Adjust the expected error message
  });
});
