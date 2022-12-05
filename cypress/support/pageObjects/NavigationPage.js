export class NavigationPage {

    chosenPage(pageName){
        cy.contains('h3', pageName).click();
    }
}
export const navigateTo = new NavigationPage();