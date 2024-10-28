describe("landing page - not logged in", () => {
    beforeEach(() => {
        cy.visit(
            "http://1822-team-1-website-production.s3-website-us-east-1.amazonaws.com"
        );
    });

    it("Post should be visible from the landing page on load", () => {
        cy.get('.landing-page > :nth-child(1) > :nth-child(1)').should('exist');
    });

    it("Six posts should be present on load", () => {
        cy.get('.landing-page > :nth-child(1) > :nth-child(1)').should('exist');
        cy.get('.landing-page > :nth-child(1) > :nth-child(2)').should('exist');
        cy.get('.landing-page > :nth-child(1) > :nth-child(3)').should('exist');
        cy.get('.landing-page > :nth-child(1) > :nth-child(4)').should('exist');
        cy.get('.landing-page > :nth-child(1) > :nth-child(5)').should('exist');
        cy.get('.landing-page > :nth-child(1) > :nth-child(6)').should('exist');
    });

    it("Various post features should be present with the bost: Post title, content body, username, and creation date", () => {
        cy.get(':nth-child(1) > .col-10 > h4 > .text-decoration-none').should('exist');
        cy.get(':nth-child(1) > .col-10 > .flex-grow-1 > div').should('exist');
        cy.get(':nth-child(1) > .col-10 > .flex-grow-1 > div').should('exist');
        cy.get(':nth-child(1) > .col-10 > .flex-grow-1 > div').should('exist');

    });

    it("Load More button should be present", () => {
        cy.contains('Load More').should('exist');
    });

    it("Upvote and Downvote buttons should be present", () => {
        cy.get(':nth-child(1) > :nth-child(1) > :nth-child(1) > img').should('exist');
        cy.get(':nth-child(1) > :nth-child(1) > :nth-child(3) > img').should('exist');
    });

    it("Clicking on a post title should take you to a post page", () => {
        cy.get(':nth-child(1) > .col-10 > h4 > .text-decoration-none').click()
        cy.url().should('include', '/posts/');
    });

    it("Clicking on a username should take you to a profile page", () => {
        cy.get(':nth-child(1) > .col-10 > .justify-content-start > .text-decoration-none').click()
        cy.url().should('include', '/profile/');
    });
})

describe("landing page - logged in as generic user", () => {
    beforeEach(() => {
        cy.visit(
            "http://1822-team-1-website-production.s3-website-us-east-1.amazonaws.com"
        );
        cy.contains("Sign In").click();
        cy.intercept("POST", "/api/accounts/login").as("loginRequest");
        cy.get('[type="text"]').type("user1");
        cy.get('[type="password"]').type("password");
        cy.contains("Log In").click();
        cy.wait("@loginRequest").its("response.statusCode").should("eq", 200);
    });

    it("Clicking on upvote should change the image and increase the upvote count", () => {
        cy.get(':nth-child(1) > :nth-child(1) > :nth-child(1) > img').click();

        cy.get(':nth-child(1) > :nth-child(1) > .likes-text')
            .should('have.text', "2");

        cy.get(':nth-child(1) > :nth-child(1) > :nth-child(1) > img').click();
    });

    it("Clicking on downvote should change the image and decrease the upvote count", () => {
        cy.get(':nth-child(1) > :nth-child(1) > :nth-child(3) > img').click();

        cy.get(':nth-child(1) > :nth-child(1) > .likes-text')
            .should('have.text', "0");

        cy.get(':nth-child(1) > :nth-child(1) > :nth-child(3) > img').click();
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