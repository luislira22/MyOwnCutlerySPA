function login() {
    cy.visit('/');
    cy.contains('Log In').click()
        .get('#formEmail').type('admin@admin.com')
        .get('#formPassword').type('12345678')
        .get('body > div.fade.modal.show > div > div > div.modal-footer > button.btn.btn-primary').click();
}

describe('Product button behavior Test1', () => {
    it('button should load Product component', () => {
        login();
        cy.contains('Products').click().get("h1")
            .should('have.text', 'Product');
    });
});

describe('Product table component Test', () => {
    it('Product component should have a structure', () => {
        login();
        cy.contains('Products').click().get("#mainwindow > div > table:nth-child(3) > thead > tr > th:nth-child(1)")
            .should('have.text', 'Reference');
    });
});

describe('Product table component Test', () => {
    it('Product component should have a structure', () => {
        login();
        cy.contains('Products').click().get("#mainwindow > div > table:nth-child(3) > thead > tr > th:nth-child(2)")
            .should('have.text', 'Manufacturing Plan');
    });
});


describe('Products form behavior Test', () => {
    it('button should load Product component correct structure', () => {
        login();
        cy.contains('Products')
            .click().get("#mainwindow > div > div > div > button:nth-child(2)")
            .click().get("h3")
            .should('have.text', 'Create');
    });
});

describe('Products form behavior Test', () => {
    it('button should load Product component correct structure', () => {
        login();
        cy.contains('Products')
            .click().get("#mainwindow > div > div > div > button:nth-child(2)")
            .click().get("#createForm > div > div.form-group.col-md-5 > label:nth-child(1)")
            .should('have.text', 'Reference');
    });
});


describe('Products form behavior Test', () => {
    it('button should load Product component correct structure', () => {
        login();
        cy.contains('Products')
            .click().get("#mainwindow > div > div > div > button:nth-child(2)")
            .click().get("#createForm > div > div.form-group.col-md-5 > label:nth-child(1)")
            .should('have.text', 'Reference');
    });
});

describe('Products form behavior Test', () => {
    it('button should load Product component correct structure', () => {
        login();
        cy.contains('Products')
            .click().get("#mainwindow > div > div > div > button:nth-child(2)")
            .click().get("h5")
            .should('have.text', 'Manufacturing Plan');
    });
});

describe('Products form behavior Test', () => {
    it('button should load Product component correct structure', () => {
        login();
        cy.contains('Products')
            .click().get("#mainwindow > div > div > div > button:nth-child(2)")
            .click().get("#createForm > div > div.form-group.col-md-5 > label:nth-child(4)\n")
            .should('have.text', 'Operations');
    });
});

describe('Products form behavior Test', () => {
    it('button should load Product component correct structure', () => {
        login();
        cy.contains('Products')
            .click().get("#mainwindow > div > div > div > button:nth-child(2)")
            .click().get("#createForm > div > div.form-group.col-md-7 > table > thead > tr > th:nth-child(1)")
            .should('have.text', 'Description');
    });
});

describe('Products form behavior Test', () => {
    it('button should load Product component correct structure', () => {
        login();
        cy.contains('Products')
            .click().get("#mainwindow > div > div > div > button:nth-child(2)")
            .click().get("#createForm > div > div.form-group.col-md-7 > table > thead > tr > th:nth-child(2)")
            .should('have.text', 'Tool');
    });
});


describe('Products form behavior Test', () => {
    it('button should load Product component correct structure', () => {
        login();
        cy.contains('Products')
            .click().get("#mainwindow > div > div > div > button:nth-child(2)")
            .click().get("#createForm > div > div.form-group.col-md-7 > table > thead > tr > th:nth-child(3)")
            .should('have.text', 'Duration');
    });
});

describe('Products form behavior Test', () => {
    it('button should load Product component correct structure', () => {
        login();
        cy.contains('Products')
            .click().get("#mainwindow > div > div > div > button:nth-child(2)")
            .click().get("#createForm > div > div.form-group.col-md-5 > input\n")
            .should('be.visible');
    });
});

describe('Products form behavior Test', () => {
    it('button should load Product component correct structure', () => {
        login();
        cy.contains('Products')
            .click().get("#mainwindow > div > div > div > button:nth-child(2)")
            .click().get("#inputState")
            .should('be.visible');
    });
});

describe('Products form behavior Test', () => {
    it('button should load Product component correct structure', () => {
        login();
        cy.contains('Products')
            .click().get("#mainwindow > div > div > div > button:nth-child(2)")
            .click().get("#inputState")
            .should('be.visible');
    });
});


describe('Products form behavior Test', () => {
    it('button should load Product component correct structure', () => {
        login();
        cy.contains('Products')
            .click().get("#mainwindow > div > div > div > button:nth-child(2)")
            .click().get("#createForm > button\n")
            .should('have.text','Create');
    });
});













