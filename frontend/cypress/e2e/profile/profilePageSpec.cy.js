describe("/encounter-creation", () => {
  beforeEach(() => {
    cy.visit(
      "http://1822-team-1-website-production.s3-website-us-east-1.amazonaws.com"
    );
    cy.contains("Sign In").click();
    cy.contains("Sign In").click();
    cy.intercept("POST", "/api/accounts/login").as("loginRequest");
    cy.get('[type="text"]').type("rickytest");
    cy.get('[type="password"]').type("rickytestpw");
    cy.contains("Log In").click();
    cy.wait("@loginRequest").its("response.statusCode").should("eq", 200);
    cy.contains("Create New Encounter").click();
  });

  it("Edit About Me", () => {
    cy.get('#navbarDropdown').click();
    cy.get(':nth-child(1) > .dropdown-item').click();
    cy.get('#edit-button').click();
    cy.get('.form-control').clear().type("Test edit through Cypress");
    cy.get('#save-button').click();
    cy.get('#about_me').should("have.text", "Test edit through Cypress");
  });

  it("Image Upload", () => {
    cy.get('#navbarDropdown').click();
    cy.get(':nth-child(1) > .dropdown-item').click();
    cy.get('#upload-label').should("exist");
  });

  it("Delete Encounter", () => {
    cy.get('#navbarDropdown').click();
    cy.get(':nth-child(1) > .dropdown-item').click();
    cy.get(':nth-child(1) > #encounter-button-container > span > :nth-child(1)').click();
    cy.get('.confirm-delete-btn').should("exist");
    cy.get('.cancel-btn').should("exist");
  });

  it("Assign Campaign to Encounter", () => {
    cy.get('#navbarDropdown').click();
    cy.get(':nth-child(1) > .dropdown-item').click();
    cy.get(':nth-child(1) > #encounter-button-container > span > .pencil').click();
    cy.get('.confirm-delete-btn').should("exist");
    cy.get('.cancel-btn').should("exist");
  });

  it("Navigates to Campaign", () => {
    cy.get('#navbarDropdown').click();
    cy.get(':nth-child(1) > .dropdown-item').click();
    cy.get('[href="/profile/rickytest/testing%20text%20field%20clear"]').click();
    cy.get('.content-card').should("exist");
  });

  it("Navigates to Campaign + remove button exists", () => {
    cy.get('#navbarDropdown').click();
    cy.get(':nth-child(1) > .dropdown-item').click();
    cy.get('[href="/profile/rickytest/testing%20text%20field%20clear"]').click();
    cy.get('.delete-button').should("exist");
  });

  it("Navigates to Encounter", () => {
    cy.get('#navbarDropdown').click();
    cy.get(':nth-child(1) > .dropdown-item').click();
    cy.get(':nth-child(1) > .title-link > h3').click();
  });

  it("Navigates to Forum Post", () => {
    cy.get('#navbarDropdown').click();
    cy.get(':nth-child(1) > .dropdown-item').click();
    cy.get('a > .content-card > h3').click();
  });
})
