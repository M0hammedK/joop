describe('Jobs Feature Tests', () => {
  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.visit('/Login'); 
    cy.get('input[name="email"]').type('a@gmail.com');
    cy.get('input[name="password"]').type('123123');
    cy.get('button[type="submit"]').click();
    cy.location("pathname").should("eq", "/");
  });

  it('should create a job successfully', () => {
    // Now visit the Create Job page
    cy.contains('Add Job').click();
    cy.location("pathname").should("eq", "/Create");
  
    // Proceed with job creation steps
    cy.get('input[name="title"]').type('New Job Title');
    cy.get('input[name="company"]').type('Company Name');
    cy.get('input[name="location"]').type('Location');
    cy.get('input[name="salary"]').type('50000');
    cy.get('input[name="category"]').type('Engineering');
    cy.get('textarea[name="description"]').type('Job description goes here.');
    cy.get('button[type="submit"]').click();
    
    // Verify redirection after job creation
    cy.location("pathname").should("eq", "/");
  });

  it('should update a job successfully', () => {

    cy.contains('Read More').click(); 
    cy.location("pathname").should("contain", "/JobDetails");

    cy.contains('Edit').click(); 
    cy.location("pathname").should("contain", "/update");


    cy.get('input[name="title"]').clear().type('Updated Job Title');
    cy.get('button[type="submit"]').click();
  });


  it('should display job listings', () => {
    // Verify job card elements are present
    cy.get('[class*="grid"]').should('exist');
    cy.get('[class*="flex flex-col bg-white"]').should('exist');
  });

  it('should navigate to job details', () => {
    // Click on Read More and verify navigation
    cy.contains('Read More').first().click();
    cy.url().should('include', '/JobDetails/');
  });

  describe('Job Seeker View', () => {
    beforeEach(() => {
      cy.contains('Logout').click();
      cy.visit('/Login');
      cy.get('input[name="email"]').type('seeker@gmail.com');
      cy.get('input[name="password"]').type('123123');
      cy.get('button[type="submit"]').click();
    });

    it('should show apply button for job seekers', () => {
      cy.get('a').contains('Apply Now!').should('be.visible');
    });

    it('should navigate to application page when clicking apply', () => {
      cy.get('a').contains('Apply Now!').first().click();
      cy.url().should('include', '/Applying/');
    });
  });
});
