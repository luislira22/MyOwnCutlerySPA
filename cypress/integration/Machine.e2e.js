function login() {
    cy.visit('/');
    cy.contains('Log In').click()
        .get('#formEmail').type('admin@admin.com')
        .get('#formPassword').type('12345678')
        .get('body > div.fade.modal.show > div > div > div.modal-footer > button.btn.btn-primary').click();
}

describe('Machine button behavior Test', () => {
    it('button should load Machine component', () => {
        login();
        cy.contains('Machines').click().get("h1")
            .should('have.text', 'Machine');
    });
});

describe('Machine table component Test', () => {
    it('Machine component should have a proper structure', () => {
        login();
        cy.contains('Machines').click().get("#mainwindow > div > table > thead > tr > th:nth-child(1)")
            .should('have.text', 'Machine Type');
    });
});

describe('Machine table component Test', () => {
    it('Machine component should have a proper structure', () => {
        login();
        cy.contains('Machines').click().get("#mainwindow > div > table > thead > tr > th:nth-child(2)")
            .should('have.text', 'Brand');
    });
});

describe('Machine table component Test', () => {
    it('Machine component should have a proper structure', () => {
        login();
        cy.contains('Machines').click().get("#mainwindow > div > table > thead > tr > th:nth-child(3)")
            .should('have.text', 'Model');
    });
});

describe('Machine table component Test', () => {
    it('Machine component should have a proper structure', () => {
        login();
        cy.contains('Machines').click().get("#mainwindow > div > table > thead > tr > th:nth-child(4)")
            .should('have.text', 'Location');
    });
});

describe('Machine table component Test', () => {
    it('Machine component should have a proper structure', () => {
        login();
        cy.contains('Machines').click().get("#mainwindow > div > table > thead > tr > th:nth-child(5)")
            .should('have.text', 'Actions');
    });
});

describe('Machines buttons behavior Test', () => {
    it('Machines  should contain visible buttons', () => {
        login();
        !cy.contains('Machines').click().get("#mainwindow > div > div > div:nth-child(1) > button:nth-child(1)")
            .should("be.visible");
    });
});

describe('Machine form behavior Test', () => {
    it('button should load Machine component correct structure', () => {
        login();
        cy.contains('Machines')
            .click().get("#mainwindow > div > div > div:nth-child(1) > button:nth-child(2)")
            .click().get("h3")
            .should('have.text', 'Create');
    });
});


describe('Machine form behavior Test', () => {
    it('button should load Machine component correct structure', () => {
        login();
        cy.contains('Machines')
            .click().get("#mainwindow > div > div > div:nth-child(1) > button:nth-child(2)")
            .click().get("#createForm > div:nth-child(1) > div:nth-child(1) > label")
            .should('have.text', 'Machine Type');
    });
});

describe('Machine form behavior Test', () => {
    it('button should load Machine component correct structure', () => {
        login();
        cy.contains('Machines')
            .click().get("#mainwindow > div > div > div:nth-child(1) > button:nth-child(2)")
            .click().get("#createForm > div:nth-child(1) > div:nth-child(2) > label")
            .should('have.text', 'Location');
    });
});

describe('Machine form behavior Test', () => {
    it('button should load Machine component correct structure', () => {
        login();
        cy.contains('Machines')
            .click().get("#mainwindow > div > div > div:nth-child(1) > button:nth-child(2)")
            .click().get("#createForm > div:nth-child(1) > div:nth-child(2) > label")
            .should('have.text', 'Location');
    });
});

describe('Machine form behavior Test', () => {
    it('button should load Machine component correct structure', () => {
        login();
        cy.contains('Machines')
            .click().get("#mainwindow > div > div > div:nth-child(1) > button:nth-child(2)")
            .click().get("#createForm > div:nth-child(2) > div:nth-child(1) > label\n")
            .should('have.text', 'Brand');
    });
});

describe('Machine form behavior Test', () => {
    it('button should load Machine component correct structure', () => {
        login();
        cy.contains('Machines')
            .click().get("#mainwindow > div > div > div:nth-child(1) > button:nth-child(2)")
            .click().get("#createForm > div:nth-child(2) > div:nth-child(1) > label\n")
            .should('have.text', 'Brand');
    });
});

describe('Machine form behavior Test', () => {
    it('button should load Machine component correct structure', () => {
        login();
        cy.contains('Machines')
            .click().get("#mainwindow > div > div > div:nth-child(1) > button:nth-child(2)")
            .click().get("#createForm > div:nth-child(2) > div:nth-child(2) > label\n")
            .should('have.text', 'Model');
    });
});

describe('Machine form behavior Test', () => {
    it('button should load Machine component correct structure', () => {
        login();
        cy.contains('Machines')
            .click().get("#mainwindow > div > div > div:nth-child(1) > button:nth-child(2)")
            .click().get("#inputState")
            .should('be.visible');
    });
});

describe('Machine form behavior Test', () => {
    it('button should load Machine component correct structure', () => {
        login();
        cy.contains('Machines')
            .click().get("#mainwindow > div > div > div:nth-child(1) > button:nth-child(2)")
            .click().get("#createForm > div:nth-child(1) > div:nth-child(2) > input\n")
            .should('be.visible');
    });
});

describe('Machine form behavior Test', () => {
    it('button should load Machine component correct structure', () => {
        login();
        cy.contains('Machines')
            .click().get("#mainwindow > div > div > div:nth-child(1) > button:nth-child(2)")
            .click().get("#createForm > div:nth-child(2) > div:nth-child(1) > input\n")
            .should('be.visible');
    });
});

describe('Machine form behavior Test', () => {
    it('button should load Machine component correct structure', () => {
        login();
        cy.contains('Machines')
            .click().get("#mainwindow > div > div > div:nth-child(1) > button:nth-child(2)")
            .click().get("#createForm > div:nth-child(2) > div:nth-child(2) > input\n")
            .should('be.visible');
    });
});

describe('Machine form button Create behavior Test', () => {
    it('button should load Machine component', () => {
        login();
        cy.contains('Machines')
            .click().get("#mainwindow > div > div > div:nth-child(1) > button:nth-child(2)")
            .click().get("#createForm > button")
            .should('have.text', 'Create');
    });
});








