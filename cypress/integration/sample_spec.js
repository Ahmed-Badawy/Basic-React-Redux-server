    describe('My First Test', function() {
        it('Does not do much!', function() {
            expect(true).to.equal(true)
            cy.fixture("example").then(fixtures=>{ console.log(fixtures) })
        })
    })

  describe('A failing Test', function() {
    it('Does not do much!', function() {
      expect(true).to.equal(false)
    })
  })


  describe('Custom', function() {
        it('Visits the Kitchen Sink', function() {
          cy.visit('https://example.cypress.io')
          cy.contains('type').click()
          cy.url().should('include', '/commands/actions')
          cy.get('.action-email').type('fake@email.com').should('have.value', 'fake@email.com')
          cy.pause()
        })
  })     
  
  
  describe('Custom Ahmed Badawy', function() {
    it('Visits the cv', function() {
        cy.visit('http://ahmed-badawy.com')
        cy.url().should( "include", 'http://ahmed-badawy.com/cv' )
        cy.get('#email').type("courtaks@yahoo.com").should("have.value","courtaks@yahoo.com")
        cy.get('#message').type("test msg").should("have.value","test msg")
        cy.get('#contactForm > :nth-child(5) > .btn').click()
        cy.pause()
    })
})       
  
  
