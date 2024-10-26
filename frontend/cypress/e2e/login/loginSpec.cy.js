describe("/login", () => {
  it("Visits the login page and logs in with incorrect password", () => {
    cy.visit(
      "http://1822-team-1-website-production.s3-website-us-east-1.amazonaws.com"
    ); // Replace with your app’s URL
    cy.contains("Sign In").click();
    cy.get('[type="text"]').type("gerdine");
    cy.get('[type="Password"]').type("behrmann");
    cy.contains("Log In").click();
    cy.contains("Invalid username/email or password");
  });
  it("Visits the login page and logs in with incorrect password", () => {
    cy.visit(
      "http://1822-team-1-website-production.s3-website-us-east-1.amazonaws.com"
    ); // Replace with your app’s URL
    cy.contains("Sign In").click();
    cy.get('[type="text"]').type("gbehrmann@gmail.com");
    cy.get('[type="Password"]').type("Test12345678");
    cy.contains("Log In").click();
    cy.contains("Invalid username/email or password");
  });
});
