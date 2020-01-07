describe('Sign Up and Log In component Test', () => {

    it('Sign Up component should have first name field', () => {
        cy.visit('/');
        cy.contains('Sign Up').click()
        cy.get("#sign-up-id > div > div.modal-body > div:nth-child(1) > div:nth-child(1) > label").should('have.text', 'First Name');
        cy.get("#formFirstName").type("FirstName").should('have.value', 'FirstName')
    });

    it('Sign Up component should have last name', () => {
        cy.get("#sign-up-id > div > div.modal-body > div:nth-child(1) > div:nth-child(2) > label").should('have.text', 'Last Name');
        cy.get("#formLastName").type("LastName");
        cy.get("#formLastName").should('have.value', 'LastName')
    });

    it('Sign Up component should verify invalid email address', () => {
        cy.get("#formEmail").type("Invalid Email Example");
        cy.get("#sign-up-id > div > div.modal-body > div:nth-child(2) > div:nth-child(1) > div").should('have.text', 'Insert a Valid Email Address (example@example.com)');
        cy.get("#formEmail").clear();
    });

    it('Sign Up component should have email', () => {
        cy.get("#sign-up-id > div > div.modal-body > div:nth-child(2) > div:nth-child(1) > label").should('have.text', 'Email');
        cy.get("#formEmail").type("Email@email.com");
        cy.get("#formEmail").should('have.value', 'Email@email.com')
    });

    it('Sign Up component should have NIF', () => {
        cy.get("#sign-up-id > div > div.modal-body > div:nth-child(2) > div:nth-child(2) > label").should('have.text', 'NIF');
        cy.get("#formNif").type("123456789");
        cy.get("#formNif").should('have.value', '123456789')
    });

    it('Sign Up component should have Country', () => {
        cy.get("#sign-up-id > div > div.modal-body > div:nth-child(3) > div:nth-child(1) > label").should('have.text', 'Country');
        cy.get("#formCountry").type("Portugal");
        cy.get("#formCountry").should('have.value', 'Portugal')
    });

    it('Sign Up component should have City', () => {
        cy.get("#sign-up-id > div > div.modal-body > div:nth-child(3) > div:nth-child(2) > label").should('have.text', 'City');
        cy.get("#formCity").type("Porto");
        cy.get("#formCity").should('have.value', 'Porto')
    });

    it('Sign Up component should have Address', () => {
        cy.get("#sign-up-id > div > div.modal-body > div:nth-child(4) > div:nth-child(1) > label").should('have.text', 'Address');
        cy.get("#formAddress").type("AddressMock");
        cy.get("#formAddress").should('have.value', 'AddressMock')
    });

    it('Sign Up component should have Postal Code', () => {
        cy.get("#sign-up-id > div > div.modal-body > div:nth-child(4) > div:nth-child(2) > label").should('have.text', 'Postal Code');
        cy.get("#formPostalCode").type("MockPostalCode");
        cy.get("#formPostalCode").should('have.value', 'MockPostalCode')
    });

    it('Sign Up component should have Password', () => {
        cy.get("#sign-up-id > div > div.modal-body > div:nth-child(5) > div:nth-child(1) > label").should('have.text', 'Password');
        cy.get("#formPassword").type("PasswordMock");
        cy.get("#formPassword").should('have.value', 'PasswordMock')
    });

    it('Sign Up component should have Verified Password', () => {
        cy.get("#sign-up-id > div > div.modal-body > div:nth-child(5) > div:nth-child(2) > label").should('have.text', 'Verify Password');
        cy.get("#formPassword2").type("PasswordMock");
        cy.get("#formPassword2").should('have.value', 'PasswordMock')
    });

    it('User has to accept Terms and Conditions check', () => {
        cy.get("#sign-up-id > div > div.modal-footer > button.btn.btn-primary").should('be.disabled')

    });

    it('Sign Up component should have Terms and Conditions', () => {
        cy.get("#sign-up-id > div > div.modal-body > form > div > label").should('have.text', 'I agree with the Terms and Conditions');
        cy.get("#custom-switch").check({ force: true });
        cy.get("#custom-switch").should('have.checked', 'true')
    });

    it('All fields were correctly filled', () => {
        cy.get("#sign-up-id > div > div.modal-footer > button.btn.btn-primary").should('not.be.disabled')

    });

    it('Sign Up', () => {
        cy.get("#sign-up-id > div > div.modal-footer > button.btn.btn-primary").click();
    });

    it('User Created with Success', () => {
        cy.get("body > div.fade.modal.show > div > div > div.modal-body > form > label").contains("Email@email.com")
        cy.get("body > div.fade.modal.show > div > div > div.modal-header > button").click();
    });

    it('Login Email Form', () => {
        cy.get("#root > nav > form > div > button.btn.btn-light").click();
        cy.get("body > div.fade.modal.show > div > div > div.modal-body > div:nth-child(1) > label").should("have.text", "Email");
        cy.get("#formEmail").should("have.value", "");

    });

    it('Log In Password Form', () => {
        cy.get("body > div.fade.modal.show > div > div > div.modal-body > div:nth-child(2) > label").should("have.text", "Password");
        cy.get("#formPassword").should("have.value", "");
    });

    it('User Log In with Success', () => {
        cy.get("#formEmail").type("Email@email.com");
        cy.get("#formPassword").type("PasswordMock");
        cy.get("body > div.fade.modal.show > div > div > div.modal-footer > button.btn.btn-primary").click();
    });

    it('Delete created User', () => {
        cy.get("#dropdown-menu-align-right").click();
        cy.get("#root > nav > form > div > div > a:nth-child(2)").click();
    });
});



