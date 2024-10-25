describe("/encounter", () => {
  beforeEach(() => {
    cy.visit(
      "http://1822-team-1-website-production.s3-website-us-east-1.amazonaws.com"
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

  it("greets with encounter title", () => {
    cy.contains("h2", "New Encounter Title Cypress");
  });

  it("shows player health amount", () => {
    cy.get(".player-hp > p").should("not.be.empty");
  });

  it("shows player icon", () => {
    cy.get(".player-hp > p").should("not.be.empty");
  });

  it("shows monster health amount", () => {
    cy.get(":nth-child(1) > .monster-hud > .monster-hp > p").should(
      "not.be.empty"
    );
  });

  it("shows monster icon", () => {
    cy.get(".player-hp > p").should("not.be.empty");
  });
});
