/// <reference types="cypress" />

describe("Exercise 1", () => {
    beforeEach(() => {
        // Step 1
        cy.setCookie("CONSENT", "YES+BE.fr+V11+BX");
        cy.visit("https://google.com");

        // Alternative (nok)
        // cy.document().then((doc) => {
        //     doc.getElementById("lb").remove();
        // });

        //cy.get('iframe[src*="consent.google.com"]', { timeout: 10000 }).should('be.visible');

        // cy.get("#lb").then((domNode) => {
        //     domNode.remove();
        // });

        //cy.get('input[type=text]').as("searchField");
        cy.get('input[name="q"]').as("searchField");
        cy.get('input[type=submit]').contains("Google").should("exist");
        cy.get('input[type=submit]').contains("Google").first().as("searchButton");

    });

    it("should find the hackages company info", () => {
        // Step 2
        const searchTerm = "hackages workshops";

        cy.get("@searchField").should("exist");
        cy.get("@searchField").type(searchTerm);

        // cy.get("@searchButton").then((searchButton) => {
        //     console.log(searchButton[0]);
        // });

        // Step 3
        cy.get("@searchButton").click({
            force: true,
        });

        // Step 4
        cy.location("search").should('contain', `q=${encodeURI(searchTerm.replace(' ', '+'))}`);

        // Step 5
        cy.get("#rhs").should("exist");
        cy.get('[data-attrid="title"] > span').first().should("contain", "Hackages");

        // Step 6

        // Use a custom command (cfr commands.js)
        const rightHandSideLinks = cy.getRightHandSideLinks();

        rightHandSideLinks.should("have.length", 3);

        rightHandSideLinks.each((foundLinkJQElement) => {
            console.log(foundLinkJQElement)
            const foundLink = foundLinkJQElement[0];
            console.log(foundLink);
            if(foundLink.innerText === "Website") {
                console.log("Found the Website link");
                console.log("Target URL: ", foundLink.getAttribute("href"));
                foundLink.click();
            }
        });

        cy.location("href").should("equal", "https://www.hackages.io/");
    });
});
