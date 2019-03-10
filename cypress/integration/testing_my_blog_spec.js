context('Testing My Blog', () => {
    before(() => {
      cy.visit('http://ahmed-badawy.com/blog/')
    })
  
    describe('Testing Links', () => {
        it("testing another thing",()=>{
            cy.get('.content > :nth-child(2)').screenshot("buttom_bar")
            cy.get('#footer-bottom > .container-inner > .pad').screenshot("menu");
            // cy.screenshot('my-image111')
            // cy.get('[href="http://ahmed-badawy.com/blog/?p=999"] > .attachment-thumb-medium').click()
            // cy.url().should("contain","http://ahmed-badawy.com/blog/?p=999");
        })
        // it('test cv link', () => {
        //     cy.pause()
        //     cy.visit("http://ahmed-badawy.com/blog/")
        //     cy.get('#menu-item-358 > a').click();
        //     cy.url().should( "contain", 'http://ahmed-badawy.com/cv/' )
        // })
        // it("test another button", ()=>{
        //     cy.get('#email').type("courtaks@yahoo.com")
        //     cy.get('#message').type("Hello world", {delay: 1000}).type('{backspace}{enter}', {delay: 2000})
        //         .type("hello again")
        //         .type("{enter}damn");
        //     cy.get('#contactForm > :nth-child(5) > .btn').click();
        // })
    })



})
  
  
  
  
