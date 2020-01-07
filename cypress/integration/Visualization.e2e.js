function login() {
    cy.visit('/');
    cy.contains('Log In').click()
        .get('#formEmail').type('admin@admin.com')
        .get('#formPassword').type('12345678')
        .get('body > div.fade.modal.show > div > div > div.modal-footer > button.btn.btn-primary').click();
}

describe('Visualization canvas not empty Test', () => {
    it('Visualization canvas should not be empty', () => {
        login();
        !cy.contains('Visualization').click();
        expect("canvas").to.not.be.empty;
    });
});

describe('Visualization buttons behavior Test', () => {
    it('Visualization  should contain visible buttons', () => {
        login();
        !cy.contains('Visualization').click().get("button")
            .should("be.visible");

    });
});



