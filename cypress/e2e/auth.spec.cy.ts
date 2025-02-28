describe('Authentication Tests', () => {
  it('should login successfully with valid credentials', () => {
    cy.visit('/Login'); 
    cy.get('input[name="email"]').type('a@gmail.com');
    cy.get('input[name="password"]').type('123123'); // Updated selector
    cy.get('button[type="submit"]').click();
    cy.location("pathname").should("eq", "/Profile/Continue");
  });

  it('should fail login with invalid credentials', () => {
    cy.visit('/Login'); 
    cy.get('input[name="email"]').type('invalid@example.com');
    cy.get('input[name="password"]').type('wrongpassword'); // Updated selector
    cy.get('button[type="submit"]').click();
  });

  it('should register successfully with valid data', () => {
    cy.visit('/Register'); 
    cy.get('input[name="name"]').type('newuser');
    cy.get('input[name="email"]').type('newuser@example.com');
    cy.get('input[name="password"]').type('password123'); // Updated selector
    cy.get('input[name="repeatPassword"]').type('password123'); // Updated selector
    cy.get('button[type="submit"]').click();
    cy.location("pathname").should("eq", "/Login");

  });

  it('should fail registration with invalid data', () => {
    cy.visit('/Register'); 
    cy.get('input[name="name"]').type('newuser');
    cy.get('input[name="email"]').type('invalidemail@gmail.com');
    cy.get('input[name="repeatPassword"]').type('123'); 
    cy.get('input[name="password"]').type('123'); // Invalid password
    cy.get('button[type="submit"]').click();
    cy.contains('Password must be at least 6 characters'); // Adjust the expected error message
  });
});
