function login() {
    cy.visit('/');
    cy.contains('Log In').click()
        .get('#formEmail').type('admin@admin.com')
        .get('#formPassword').type('12345678')
        .get('body > div.fade.modal.show > div > div > div.modal-footer > button.btn.btn-primary').click();
}

describe('Operations button behavior Test', () => {
    it('button should load Operation component', () => {
        login();
        cy.contains('Operations').click().get("h1")
            .should('have.text', 'Operation');
    });
});

describe('Operation table component Test', () => {
    it('Operation component should have a structure', () => {
        login();
        cy.contains('Operations').click().get("#mainwindow > div > table > thead > tr > th:nth-child(1)")
            .should('have.text', 'Description')
    });
});

describe('Operation table component Test', () => {
    it('Operation component should have a structure', () => {
        login();
        cy.contains('Operations').click().get("#mainwindow > div > table > thead > tr > th:nth-child(2)")
            .should('have.text', 'Duration');
    });
});

describe('Operation table component Test', () => {
    it('Operation component should have a structure', () => {
        login();
        cy.contains('Operations').click().get("#mainwindow > div > table > thead > tr > th:nth-child(3)")
            .should('have.text', 'Tool');
    });
});


describe('Operations form behavior Test', () => {
    it('button should load Operations component correct structure', () => {
        login();
        cy.contains('Operations')
            .click().get("#mainwindow > div > div > div > button:nth-child(2)")
            .click().get("h3")
            .should('have.text', 'Create');
    });
});

describe('Operations form behavior Test', () => {
    it('button should load Operations component correct structure', () => {
        login();
        cy.contains('Operations')
            .click().get("#mainwindow > div > div > div > button:nth-child(2)")
            .click().get("#createForm > div:nth-child(1) > div:nth-child(1) > div > label\n")
            .should('have.text', 'Description');
    });
});

describe('Operations form behavior Test', () => {
    it('button should load Operations component correct structure', () => {
        login();
        cy.contains('Operations')
            .click().get("#mainwindow > div > div > div > button:nth-child(2)")
            .click().get("#createForm > div:nth-child(1) > div:nth-child(2) > div > label\n")
            .should('have.text', 'Tool');
    });
});

describe('Operations form behavior Test', () => {
    it('button should load Operations component correct structure', () => {
        login();
        cy.contains('Operations')
            .click().get("#mainwindow > div > div > div > button:nth-child(2)")
            .click().get("#createForm > div:nth-child(1) > div:nth-child(1) > div > input\n")
            .should('be.visible');
    });
});

describe('Operations form behavior Test', () => {
    it('button should load Operations component correct structure', () => {
        login();
        cy.contains('Operations')
            .click().get("#mainwindow > div > div > div > button:nth-child(2)")
            .click().get("#createForm > div:nth-child(1) > div:nth-child(1) > div > input\n")
            .should('be.visible');
    });
});

describe('Operations form behavior Test', () => {
    it('button should load Operations component correct structure', () => {
        login();
        cy.contains('Operations')
            .click().get("#mainwindow > div > div > div > button:nth-child(2)")
            .click().get("#createForm > div:nth-child(1) > div:nth-child(2) > div > input\n")
            .should('be.visible');
    });
});

describe('Operations form behavior Test', () => {
    it('button should load Operations component correct structure', () => {
        login();
        cy.contains('Operations')
            .click().get("#mainwindow > div > div > div > button:nth-child(2)")
            .click().get("#createForm > div:nth-child(2) > div:nth-child(1) > div > input\n")
            .should('be.visible');
    });
});

describe('Operations form behavior Test', () => {
    it('button should load Operations component correct structure', () => {
        login();
        cy.contains('Operations')
            .click().get("#mainwindow > div > div > div > button:nth-child(2)")
            .click().get("#createForm > div:nth-child(2) > div:nth-child(1) > div > input\n")
            .should('be.visible');
    });
});

describe('Operations form behavior Test', () => {
    it('button should load Operations component correct structure', () => {
        login();
        cy.contains('Operations')
            .click().get("#mainwindow > div > div > div > button:nth-child(2)")
            .click().get("#createForm > div:nth-child(2) > div:nth-child(2) > div > input\n")
            .should('be.visible');
    });
});

describe('Operations form behavior Test', () => {
    it('button should load Operations component correct structure', () => {
        login();
        cy.contains('Operations')
            .click().get("#mainwindow > div > div > div > button:nth-child(2)")
            .click().get("#createForm > div:nth-child(2) > div:nth-child(2) > div > input\n")
            .should('be.visible');
    });
});

describe('Operations form behavior Test', () => {
    it('button should load Operations component correct structure', () => {
        login();
        cy.contains('Operations')
            .click().get("#mainwindow > div > div > div > button:nth-child(2)")
            .click().get("#createForm > div:nth-child(2) > div:nth-child(3) > div > input\n")
            .should('be.visible');
    });
});

describe('Operations form behavior Test', () => {
    it('button should load Operations component correct structure', () => {
        login();
        cy.contains('Operations')
            .click().get("#mainwindow > div > div > div > button:nth-child(2)")
            .click().get("#createForm > div:nth-child(2) > div:nth-child(1) > div > label\n")
            .should('have.text', 'Hours');
    });
});

describe('Operations form behavior Test', () => {
    it('button should load Operations component correct structure', () => {
        login();
        cy.contains('Operations')
            .click().get("#mainwindow > div > div > div > button:nth-child(2)")
            .click().get("#createForm > div:nth-child(2) > div:nth-child(2) > div > label\n")
            .should('have.text', 'Minutes');
    });
});

describe('Operations form behavior Test', () => {
    it('button should load Operations component correct structure', () => {
        login();
        cy.contains('Operations')
            .click().get("#mainwindow > div > div > div > button:nth-child(2)")
            .click().get("#createForm > div:nth-child(2) > div:nth-child(3) > div > label\n")
            .should('have.text', 'Seconds');
    });
});













