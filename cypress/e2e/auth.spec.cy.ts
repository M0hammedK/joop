describe('Authentication Tests', () => {
  beforeEach(() => {
    cy.viewport('macbook-15');
  });

  describe('Login Tests', () => {
    it('should login and logout successfully', () => {
      cy.visit('/Login'); 
      cy.get('input[name="email"]').type('a@gmail.com');
      cy.get('input[name="password"]').type('123123');
      cy.get('button[type="submit"]').click();
      cy.location("pathname").should("eq", "/");
      
      // Logout
      cy.contains('Logout').click();
      cy.location("pathname").should("eq", "/");
    });

    it('should fail login with invalid credentials', () => {
      cy.visit('/Login'); 
      cy.get('input[name="email"]').type('invalid@example.com');
      cy.get('input[name="password"]').type('wrongpassword');
      cy.get('button[type="submit"]').click();
      cy.contains('Invalid User');
    });

  });

  describe('Registration Tests', () => {
    it('should register successfully with valid data', () => {
      const uniqueEmail = `newusers${Date.now()}-test@example.com`;
    
      cy.visit('/Register');
      cy.get('input[name="name"]').type('newusers');
      cy.get('input[name="email"]').type(uniqueEmail); 
      cy.get('input[name="password"]').type('password123'); 
      cy.get('input[name="repeatPassword"]').type('password123'); 
      cy.get('button[type="submit"]').click();
      cy.location("pathname").should("eq", "/Login");
    });
    
    it('should fail registration with invalid data', () => {
      cy.visit('/Register'); 
      cy.get('input[name="name"]').type('newuser');
      cy.get('input[name="email"]').type('invalidemail@gmail.com');
      cy.get('input[name="repeatPassword"]').type('123'); 
      cy.get('input[name="password"]').type('123');
      cy.get('button[type="submit"]').click();
      cy.contains('Password must be at least 6 characters');
    });

    it('should validate password match', () => {
      cy.visit('/Register');
      cy.get('input[name="name"]').type('testuser');
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('input[name="repeatPassword"]').type('password456');
      cy.get('button[type="submit"]').click();
      // Add assertion for password mismatch error if implemented
    });
  });
});
