describe("/register", () => {
  beforeEach(() => {
    cy.visit(
      "http://1822-team-1-website-production.s3-website-us-east-1.amazonaws.com"
    );
    cy.contains("Sign Up").click();
  });

  it("greets with Welcome to", () => {
    cy.contains("h1", "Welcome to");
  });

  it("displays error for invalid Password", () => {
    cy.get('[placeholder="Username"]').type(
      `testuser${Math.floor(Math.random() * 10000)}`
    );
    cy.get('[placeholder="Email"]').type(
      `email${Math.floor(Math.random() * 10000)}@gmail.com`
    );
    cy.get('[placeholder="Password"]').type("pass", { delay: 100 });
    cy.get(".register-btn").click();
    cy.wait(500);
    cy.contains("Your password must be at least 8 characters long").should(
      "be.visible"
    );
  });

  it("Registering an account already in database", () => {
    cy.get('[placeholder="Username"]').type("person3");
    cy.get('[placeholder="Email"]').type("email@gmail.com");
    cy.get('[placeholder="Password"]').type("password", { delay: 100 });
    cy.get(".register-btn").click();
    cy.wait(500);
    cy.contains("Email is already registered");
  });

  it("Successfully registers an account", () => {
    cy.get('[placeholder="Username"]').type(
      `person${Math.floor(Math.random() * 10000)}`
    );
    cy.get('[placeholder="Email"]').type(
      `email${Math.floor(Math.random() * 10000)}@gmail.com`
    );
    cy.get('[placeholder="Password"]').type("password");
    cy.get(".register-btn").click();
    cy.wait(500);
    cy.contains("Registering");
    cy.contains("Registration successful!");
  });

  it("goes to log in page", () => {
    cy.contains("Login here").click();
    cy.contains("Log");
  });
});
