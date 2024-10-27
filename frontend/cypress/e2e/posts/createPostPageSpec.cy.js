import "cypress-wait-until";

describe("/PostCreation", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit(
      "http://1822-team-1-website-production.s3-website-us-east-1.amazonaws.com"
    );

    cy.contains("Sign In").click();
    cy.get('[placeholder="Username or Email"]').type("Test12345678");
    cy.get('[placeholder="Password"]').type("Test12345678");

    // Intercept the login API call
    cy.intercept("POST", "/api/accounts/login").as("loginRequest");

    cy.contains("Log In").click();

    // Wait for the login API to complete and confirm status
    cy.wait("@loginRequest").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });

    // Wait until the username appears in localStorage
    cy.waitUntil(
      () =>
        cy
          .window()
          .then((win) => win.localStorage.getItem("username") !== null),
      { timeout: 10000, interval: 500 }
    ).then(() => {
      cy.window().then((win) => {
        const username = win.localStorage.getItem("username");
        expect(username).to.exist;
        expect(username).to.equal("Test12345678"); // Replace with your actual username
      });
    });

    // Confirm navigation to the post creation page
    cy.contains("Create New Post").click();
    cy.url().should("include", "/post-creation");
  });

  it("Submit form successfully", () => {
    cy.get(".title-input").as("titleInput");
    cy.get("@titleInput").should("be.visible").click().type("Test");
    cy.get("#encounter-dropdown").wait(500).select(1);
    cy.get(".ReactQuill").as("Quill");
    cy.get("@Quill").should("be.visible").click().type("test text area text");
    cy.get(".PC-btn").click();
    cy.contains("Post successfully created!");
  });

  it("Submit form without title and receive error", () => {
    cy.contains("Create New Post");
    cy.wait(500);
    cy.get(".ReactQuill").as("Quill");
    cy.get("@Quill").should("be.visible").click().type("test text area text");
    cy.get("#encounter-dropdown").wait(500).select(1);
    cy.get(".PC-btn").click();
    cy.contains("All fields are required!");
  });
  it("types bold text into the Quill editor and verifies it", () => {
    cy.get(".title-input").as("titleInput");
    cy.get("@titleInput").should("be.visible").click().type("Test");
    cy.get("#encounter-dropdown").wait(500).select(1);
    // Ensure the Quill editor is visible
    cy.get(".ReactQuill").should("be.visible");

    // Click the bold button in the toolbar
    cy.get(".ql-toolbar").find("button.ql-bold").click();

    // Type text into the editor
    cy.get(".ql-editor").type("This is bold text");

    // Verify that the text is wrapped in a <strong> or <b> tag
    cy.get(".ql-editor").within(() => {
      cy.get("strong, b")
        .should("exist")
        .and("contain.text", "This is bold text");
    });
    cy.get(".PC-btn").scrollIntoView().click();
    cy.contains("Post successfully created!");
  });
});
