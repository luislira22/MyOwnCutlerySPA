function login() {
    cy.visit('/');
    cy.contains('Log In').click()
        .get('#formEmail').type('admin@admin.com')
        .get('#formPassword').type('12345678')
        .get('body > div.fade.modal.show > div > div > div.modal-footer > button.btn.btn-primary').click();
}

describe('Production Line button behavior Test', () => {
    it('button should load Production Line component', () => {
        login();
        cy.contains('Production Line').click().get("h1")
            .should('have.text', 'ProductionLine');
    });
});

describe('Production Line table component Test', () => {
    it('Production Line component should have a structure', () => {
        login();
        cy.contains('Production Line').click().get("#mainwindow > div > table > thead > tr > th:nth-child(1)")
            .should('have.text', 'Reference');
    });
});

describe('Production Line table component Test', () => {
    it('Production Line component should have a structure', () => {
        login();
        cy.contains('Production Line').click().get("#mainwindow > div > table > thead > tr > th:nth-child(2)")
            .should('have.text', 'Machines');
    });
});


describe('Production Line form behavior Test', () => {
    it('button should load Production Line component correct structure', () => {
        login();
        cy.contains('Production Line')
            .click().get("#mainwindow > div > div > div > button:nth-child(2)")
            .click().get("h3")
            .should('have.text', 'Create');
    });
});

describe('Production Line form behavior Test', () => {
    it('button should load Production Line component correct structure', () => {
        login();
        cy.contains('Production Line')
            .click().get("#mainwindow > div > div > div > button:nth-child(2)")
            .click().get("#createForm > div > div:nth-child(1) > label")
            .should('have.text', 'Production Line');
    });
});

describe('Production Line form behavior Test', () => {
    it('button should load Production Line component correct structure', () => {
        login();
        cy.contains('Production Line')
            .click().get("#mainwindow > div > div > div > button:nth-child(2)")
            .click().get("#createForm > div > div:nth-child(2) > label")
            .should('have.text', 'Machines');
    });
});

describe('Production Line form behavior Test', () => {
    it('button should load Production Line component correct structure', () => {
        login();
        cy.contains('Production Line')
            .click().get("#mainwindow > div > div > div > button:nth-child(2)")
            .click().get("#createForm > div > div:nth-child(1) > input\n")
            .should('be.visible');
    });
});

describe('Production Line form behavior Test', () => {
    it('button should load Production Line component correct structure', () => {
        login();
        cy.contains('Production Line')
            .click().get("#mainwindow > div > div > div > button:nth-child(2)")
            .click().get("#createForm > button")
            .should('have.text', 'Create');
    });
});

