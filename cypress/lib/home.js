/// <reference types="cypress" />

function getUsername() {
  return cy.get("input[type=email]").as("username");
}

class HomePage {
  getUsername() {
    return cy.get("input[type=email]").as("username");
  }
}

module.exports = {
  getUsername,
  homePage: new HomePage(),
};
