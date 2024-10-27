describe("landing page - not an admin", () => {
    beforeEach(() => {
        cy.visit(
            "http://1822-team-1-website-production.s3-website-us-east-1.amazonaws.com"
        );
    });


})

describe("landing page - admin", () => {
    beforeEach(() => {
        cy.visit(
            "http://1822-team-1-website-production.s3-website-us-east-1.amazonaws.com"
        );

        cy.contains("Sign In").click();
        cy.intercept("POST", "/api/accounts/login").as("loginRequest");
        cy.get('[type="text"]').type("admin");
        cy.get('[type="password"]').type("adminpassword");
        cy.contains("Log In").click();
        cy.wait("@loginRequest").its("response.statusCode").should("eq", 200);
    });

    it("Delete button should be present", () => {
        cy.get(':nth-child(1) > .justify-content-center > .btn > img').should('exist')
    });

    it("A confirmation window should appear when the admin clicks the delete button", () => {
        cy.get(':nth-child(1) > .justify-content-center > .btn > img').click();
        cy.contains('Delete Post Confirmation').should('exist');
    });

    // it("should open the delete confirmation modal and close it on clicking Cancel", () => {
    //     // Locate the delete button for a specific post and click it to open the modal

    //     cy.get(':nth-child(1) > .justify-content-center > .btn').click();


    //     // Assert that the modal is now visible
    //     cy.get("#deleteModal").should("be.visible");

    //     // Click the Cancel button to close the modal
    //     cy.get("#deleteModal").within(() => {
    //         cy.contains("button", "Cancel").click();
    //     });

    //     // Assert that the modal is not visible anymore
    //     cy.get("#deleteModal").should("not.be.visible");
    // });
})