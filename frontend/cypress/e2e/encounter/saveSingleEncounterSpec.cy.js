describe("saving an encounter", () => {
  it("saves an encounter if logged in", () => {
    cy.visit(
      "http://1822-team-1-website-production.s3-website-us-east-1.amazonaws.com"
    );
    cy.contains("Sign In").click();
    cy.get('[type="text"]').type("Aaron");
    cy.get('[type="password"]').type("asdfjkl;");
    cy.contains("Log In").click();

    cy.get(":nth-child(1) > .nav-link").click();
  });
});
