describe("/PostCreation", () => {
  beforeEach(() => {
    cy.visit(
      "http://1822-team-1-website-production.s3-website-us-east-1.amazonaws.com"
    );
    cy.contains("Sign In").click();
    cy.get('[placeholder="Username or Email"]').type("Test12345678");
    cy.get('[placeholder="Password"]').type("Test12345678");
    cy.contains("Log In").click();
    cy.contains("Create New Post").click();
  });

  it("headed by Create New Post", () => {
    cy.contains("Create New Post");
  });

  it("Submit form successfully", () => {
    cy.pause();
    cy.get("title-input").click().type("Test");
    cy.get("#encounter-dropdown").wait(500).select(1);
    cy.get(".ReactQuill").click().type("test text area text");
    cy.get(".PC-btn").click();
    cy.contains("Post successfully created!");
  });
});
