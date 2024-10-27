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

  it("should navigate to profile", () => {
    cy.get('#navbarDropdown').click();
    cy.get(':nth-child(1) > .dropdown-item').click();
    // cy.intercept("GET", "/api/accounts/profile", {
    //   statusCode: 200,
    //   body: {

    //   }
    // })
  });
})
