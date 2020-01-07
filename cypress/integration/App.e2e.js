describe('End2End title Test', () => {
    it('should have a title', () => {
        cy.visit('/');
        cy.get('title')
            .should('have.text', 'MyOwnCutlery');
    });
});


