function login() {
    cy.visit('/');
    cy.contains('Log In').click()
        .get('#formEmail').type('admin@admin.com')
        .get('#formPassword').type('12345678')
        .get('body > div.fade.modal.show > div > div > div.modal-footer > button.btn.btn-primary').click();
}

describe('Machine Type button behavior Test', () => {
    it('button should load Machine Type component', () => {
        login();
        cy.contains('Machine Types').click().get("h1")
            .should('have.text', 'MachineType');
    });
});

describe('Machine Type table component Test', () => {
    it('MachineType component should have a structure', () => {
        login();
        cy.contains('Machine Type').click().get("#mainwindow > div > table > thead > tr > th:nth-child(1)")
            .should('have.text', 'Type')
    });
});

describe('Machine Type table component Test', () => {
    it('MachineType component should have a structure', () => {
        login();
        cy.contains('Machine Type').click().get("#mainwindow > div > table > thead > tr > th:nth-child(2)")
            .should('have.text', 'Operations');

    });
});

describe('Machine Type table component Test', () => {
    it('MachineType component should have a structure', () => {
        login();
        cy.contains('Machine Type').click().get("#mainwindow > div > table > thead > tr > th:nth-child(3)")
            .should('have.text', 'Actions');
    });
});

describe('Machine Type form behavior Test', () => {
    it('button should load Machine Type component correct structure', () => {
        login();
        cy.contains('Machine Types')
            .click().get("#mainwindow > div > div > div > button:nth-child(2)")
            .click().get("h3")
            .should('have.text', 'Create');
    });
});

describe('Machine Type form behavior Test', () => {
    it('button should load Machine Type component correct structure', () => {
        login();
        cy.contains('Machine Types')
            .click().get("#mainwindow > div > div > div > button:nth-child(2)")
            .click().get("#createForm > div > div:nth-child(1) > label")
            .should('have.text', 'MachineType');
    });
});

describe('Machine Type form behavior Test', () => {
    it('button should load Machine Type component correct structure', () => {
        login();
        cy.contains('Machine Types')
            .click().get("#mainwindow > div > div > div > button:nth-child(2)")
            .click().get("#createForm > div > div:nth-child(2) > label")
            .should('have.text', 'Operations');
    });
});

describe('Machine Type form behavior Test', () => {
    it('button should load Machine Type component correct structure', () => {
        login();
        cy.contains('Machine Types')
            .click().get("#mainwindow > div > div > div > button:nth-child(2)")
            .click().get("#createForm > div > div:nth-child(1) > input\n")
            .should('be.visible');
    });
});

describe('Machine Type form behavior Test', () => {
    it('button should load Machine Type component correct structure', () => {
        login();
        cy.contains('Machine Types')
            .click().get("#mainwindow > div > div > div > button:nth-child(2)")
            .click().get("#createForm > div > div:nth-child(1) > input\n")
            .should('be.visible');
    });
});

describe('Machine Type form create button behavior Test', () => {
    it('button should load Machine Type component correct structure', () => {
        login();
        cy.contains('Machine Types')
            .click().get("#mainwindow > div > div > div > button:nth-child(2)")
            .click().get("#createForm > button")
            .should('be.visible');
    });
});



