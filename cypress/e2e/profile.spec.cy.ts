describe('Profile Functionality Tests', () => {
  beforeEach(() => {
    cy.viewport('macbook-15')
  })

  describe('Job Seeker Profile Tests', () => {
    beforeEach(() => {
      cy.loginAsJobSeeker()
      cy.visit('/Profile/Continue')
      cy.url().should('include', '/Profile/Continue')
    })

    it('should complete job seeker profile successfully', () => {
      // Test file upload
      cy.get('input[type="file"]').selectFile('cypress/fixtures/test-resume.pdf', { force: true })
      
      // Test skills input
      cy.get('input[name="skills"]').type('JavaScript,React,Node.js')
      
      // Submit form
      cy.get('button[type="submit"]').click()
      
      // Should redirect to home page on success
      cy.url().should('eq', Cypress.config().baseUrl + '/')
      
      // Verify local storage updates
      cy.window().its('localStorage').invoke('getItem', 'user').then((user: string | null) => {
        if (!user) throw new Error('User data not found in localStorage')
        const userData = JSON.parse(user)
        expect(userData.skills).to.include('JavaScript')
        expect(userData.resume).to.exist
      })
    })

    it('should show error when resume is not uploaded', () => {
      // Test skills input without resume
      cy.get('input[name="skills"]').type('JavaScript,React,Node.js')
      
      // Submit form
      cy.get('button[type="submit"]').click()
      
      // Should show error message
      cy.get('h3.text-red-600').should('contain', 'You have to upload a resume')
      
      // Should stay on the same page
      cy.url().should('include', '/Profile/Continue')
    })
  })

  describe('Employer Profile Tests', () => {
    beforeEach(() => {
      cy.loginAsEmployer()
      cy.visit('/Profile/Continue')
      cy.url().should('include', '/Profile/Continue')
    })

    it('should complete employer profile successfully', () => {
      // Test company name input
      cy.get('input[name="companyName"]').type('Test Company')
      
      // Test website input
      cy.get('input[name="website"]').type('https://testcompany.com')
      
      // Submit form
      cy.get('button[type="submit"]').click()
      
      // Should redirect to home page on success
      cy.url().should('eq', Cypress.config().baseUrl + '/')
      
      // Verify local storage updates
      cy.window().its('localStorage').invoke('getItem', 'user').then((user: string | null) => {
        if (!user) throw new Error('User data not found in localStorage')
        const userData = JSON.parse(user)
        expect(userData.companyName).to.equal('Test Company')
        expect(userData.website).to.equal('https://testcompany.com')
      })
    })

    it('should show error when required fields are missing', () => {
      // Submit form without filling required fields
      cy.get('button[type="submit"]').click()
      
      // Form should not submit due to HTML5 validation
      cy.url().should('include', '/Profile/Continue')
    })

    it('should validate website URL format', () => {
      // Test company name input
      cy.get('input[name="companyName"]').type('Test Company')
      
      // Test invalid website input
      cy.get('input[name="website"]').type('invalid-url')
      
      // Submit form
      cy.get('button[type="submit"]').click()
      
      // Should stay on the same page
      cy.url().should('include', '/Profile/Continue')
    })
  })

  describe('Profile Navigation Tests', () => {
    it('should redirect to home when accessing profile completion page without auth', () => {
      // Clear any existing auth
      cy.window().its('localStorage').invoke('clear')
      
      // Try to access profile completion page directly
      cy.visit('/Profile/Continue')
      
      // Should redirect to home
      cy.url().should('eq', Cypress.config().baseUrl + '/')
    })
  })
})
