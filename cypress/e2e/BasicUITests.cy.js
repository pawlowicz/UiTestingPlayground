import { navigateTo } from "../support/pageObjects/NavigationPage";

describe ('Basic UI tests', () => {

    beforeEach('Open Main Page', () => {
        cy.openHomePage();
    })

    it('Dynamic ID test', () => {
        navigateTo.chosenPage('Dynamic ID')
        cy.get('.btn').contains('Button with Dynamic ID').click();
    })

    it('Class Attribute test', () => {
        navigateTo.chosenPage('Class Attribute');
        const stub = cy.stub();
        cy.on('window:alert', stub);
        cy.get('.btn-primary').click().then( () => {
            expect(stub.getCall(0)).to.be.calledWith('Primary button pressed');
        })
    })

    it('Load Delay test', () => {
        navigateTo.chosenPage('Load Delay', {timeout: 10000});
        cy.get('.btn-primary').click();
    })

    it('Client Side Delay test', () => {
        navigateTo.chosenPage('Client Side Delay');
        cy.get('[id="ajaxButton"]').click();
        cy.get('.bg-success', {timeout: 15000}).contains('Data calculated on the client side.');
    })

    it('Text Input test', () => {
        navigateTo.chosenPage('Text Input');

        cy.get('[placeholder="MyButton"]').type('MyButton').then( () => {
            cy.get('[id="updatingButton"]').click();
        });
        cy.get('[id="updatingButton"]').should('contain', 'MyButton');
    })

    it('Verify Text', () => {
        navigateTo.chosenPage('Verify Text');
        cy.get('.bg-primary').contains('Welcome');
    })

    it.only('Sample App', () => {
        navigateTo.chosenPage('Sample App');
        cy.get('[placeholder="User Name"]').type('Weronika');
        cy.get('[name="Password"]').type('pwd');
        cy.get('[id="login"]').click().then( () => {
            cy.get('[id="loginstatus"]').contains('Welcome');
        })
    })

    it('Mouse Over', () => {
        navigateTo.chosenPage('Mouse Over');
        for (let i = 0; i < 2; i++){
            cy.contains('Click me').click();            
        }
        cy.get('[id="clickCount"]').should('contain', '2');
    })
})