describe("/login", () => {
  beforeEach(() => {
    cy.visit(
      "http://1822-team-1-website-production.s3-website-us-east-1.amazonaws.com"
    );
    cy.contains("Sign In").click();
  });

  it("greets with Welcome to", () => {
    cy.contains("h1", "Welcome to");
  });

  it("displays error for invalid login", () => {
    cy.get('[placeholder="Username or Email"]').type("text");
    cy.get('[placeholder="Password"]').type("password");
    cy.contains("Log In").click();
    cy.contains("Invalid username/email or password");
  });

  it("logs in successfully with valid credentials", () => {
    cy.get('[placeholder="Username or Email"]').type("Test12345678");
    cy.get('[placeholder="Password"]').type("Test12345678");
    cy.contains("Log In").click();
    cy.contains("Create New Post");
  });

  it("", () => {
    cy.contains("Register here").click();
    cy.contains("Register for an account");
  });
});
