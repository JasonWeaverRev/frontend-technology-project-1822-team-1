// describe("/encounter not logged in", () => {
//   beforeEach(() => {
//     cy.visit(
//       "http://1822-team-1-website-production.s3-website-us-east-1.amazonaws.com"
//     );
//     cy.contains("Create New Encounter").click();
//     cy.get(".title-info").type("New Encounter Title Cypress");
//     cy.get("select").select("1/4");
//     cy.contains("Generate Mobs").click();
//     cy.get(
//       ":nth-child(1) > .justify-content-between > .addBtnContainer > .monster-add-button"
//     )
//       .click()
//       .click();
//     cy.contains("Publish Encounter").click();
//   });

//   it("greets with encounter title", () => {
//     cy.contains("h2", "New Encounter Title Cypress");
//   });

//   it("shows player health amount", () => {
//     cy.get(".player-hp > p").should("not.be.empty");
//   });

//   it("shows player icon", () => {
//     cy.get(".player-hp > p").should("not.be.empty");
//   });

//   it("shows monster health amount", () => {
//     cy.get(":nth-child(1) > .monster-hud > .monster-hp > p").should(
//       "not.be.empty"
//     );
//   });

//   it("shows monster icon", () => {
//     cy.get(".player-hp > p").should("not.be.empty");
//   });
// });

describe("/encounter logged in", () => {
  beforeEach(() => {
    cy.visit(
      "http://1822-team-1-website-production.s3-website-us-east-1.amazonaws.com/"
    );
    cy.contains("Sign In").click();
    cy.intercept("POST", "/api/accounts/login").as("loginRequest");
    cy.get('[type="text"]').type("Aaron");
    cy.get('[type="password"]').type("asdfjkl;");
    cy.contains("Log In").click();
    cy.wait("@loginRequest").its("response.statusCode").should("eq", 200);

    cy.url().should(
      "eq",
      "http://1822-team-1-website-production.s3-website-us-east-1.amazonaws.com/"
    );

    cy.contains("Create New Encounter").click();
    cy.get(".title-info").type("New Encounter Title Cypress");
    cy.get("select").select("1/4");
    cy.contains("Generate Mobs").click();
    cy.get(
      ":nth-child(1) > .justify-content-between > .addBtnContainer > .monster-add-button"
    )
      .click()
      .click();
    cy.contains("Publish Encounter").click();
  });

  it("should have save encounter button available", () => {
    cy.contains("Save Encounter").should("exist");
  });

  it("should see an encounter saved alert and edit encounter button when saved", () => {
    cy.contains("Save Encounter").click();
    cy.contains("Successfully saved encounter!").should("exist");
    cy.contains("Edit Encounter").should("exist");
  });

  it("should allow you to edit encounters after they have been saved", () => {
    cy.contains("Save Encounter").click();
    cy.contains("Edit Encounter").click();
    cy.contains("Create New Encounter");
    cy.get(".title-info").type(" Edited");
    cy.contains("Publish Encounter").click();
    cy.contains("Save Encounter").click();
    cy.contains("Successfully saved encounter!").should("exist");
  });
});
