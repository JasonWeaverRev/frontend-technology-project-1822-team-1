describe("/encounter-creation", () => {
  beforeEach(() => {
    cy.visit(
      "http://1822-team-1-website-production.s3-website-us-east-1.amazonaws.com"
    );
    cy.contains("Create New Encounter").click();
  });

  it("greets with Create an Encounter", () => {
    cy.contains("h2", "Create an Encounter");
  });

  it("does not allow publishing if title and roster are empty", () => {
    cy.contains("Publish Encounter").click();
    cy.contains("Please add monsters to the roster");
    cy.get(".title-info").should(
      "have.css",
      "background-color",
      "rgb(248, 215, 218)"
    );
  });

  it("does not have monsters on load", () => {
    cy.get(".monster-list").should("be.empty");
    cy.get(".cr").should("have.value", null);
  });

  it("does not generate mobs if inital combo value is not changed", () => {
    cy.get(".cr").should("have.value", null);
    cy.contains("Generate Mobs").click();
    cy.get(".monster-list").should("be.empty");
  });

  it("returns a list of monsters if applicable", () => {
    cy.get("select").select("1/4");
    cy.contains("Generate Mobs").click();
    cy.get(".monster-list").should("not.be.empty");
  });

  it("adds monsters to the roster when add is clicked", () => {
    cy.get("select").select("1/4");
    cy.contains("Generate Mobs").click();
    cy.get(
      ":nth-child(1) > .justify-content-between > .addBtnContainer > .monster-add-button"
    ).click();
    cy.get(".encounter-roster").should("not.be.empty");
  });

  it("removes monsters from the roster when X is clicked", () => {
    cy.get("select").select("1/4");
    cy.contains("Generate Mobs").click();
    cy.get(
      ":nth-child(1) > .justify-content-between > .addBtnContainer > .monster-add-button"
    ).click();
    cy.get(".encounter-roster").should("not.be.empty");
    cy.get(".monster-remove-button").click();
    cy.get(".encounter-roster").should("not.contain", ".roster-card");
  });

  it("should redirect to D&DBeyond when monster name is clicked", () => {
    cy.get("select").select("1/4");
    cy.contains("Generate Mobs").click();
    cy.get(":nth-child(1) > .justify-content-between > .monster-header > a")
      .should("have.attr", "href")
      .and("include", "dndbeyond");
  });

  it("should allow encounter to be published if at least title and roster are not empty", () => {
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
});
