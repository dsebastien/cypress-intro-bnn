/// <reference types="cypress" />

const _ = require("../lib/home");

describe("Playing with Cypress", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500");
    cy.get("input[type=email]").as("username");
    cy.fixture("example").as("data");
  });

  it("should contain a title", () => {
    // cy.get("h1").should("contain", "Hackages");

    // tie to the css
    // cy.get("#title").should("have.length", 2);
    cy.get("[data-cy=title]").should("contain", "Hackages");
  });

  it("should count the number of children", () => {
    cy.get("#cities").children().should("exist").and("have.length", 4);
  });

  it("should submit email", () => {
    // cy.get("input[type=password]").as('password')
    cy.get("@data").then((data) => {
      // cy.intercept('GET', '/userInfo', data);
      cy.get("@username").type(data.email);
    });
    cy.get("button[type=submit]").click();
  });
});
