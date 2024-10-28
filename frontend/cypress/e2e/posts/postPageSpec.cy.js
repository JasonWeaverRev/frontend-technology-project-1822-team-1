describe("post page - not logged in", () => {
    beforeEach(() => {
        cy.visit(
            "http://1822-team-1-website-production.s3-website-us-east-1.amazonaws.com"
        );
        cy.get(':nth-child(1) > .col-10 > h4 > .text-decoration-none').click();
    });

    it("Post page should render with the title of the post present", () => {
        cy.contains('Test').should('exist');
    });

    it("Comment form container existence check", () => {
        cy.get('.form-control').should('exist');
        cy.contains('Submit').should('exist');
        cy.contains('comments').should('exist');
    });

    it("Clicking the Encounter Link should take you to the encounter page", () => {
        cy.get('.text-decoration-none > .btn').click();
        cy.url().should('include', '/encounter');
    });

    it("Clicking the post username should take you to the post user's profile page", () => {
        cy.get(':nth-child(2) > .text-decoration-none').click();
        cy.url().should('include', '/profile/');
    });

    it("Clicking the comment username should take you to the comment user's profile page", () => {
        cy.get(':nth-child(3) > :nth-child(1) > .col-11 > .d-flex > .text-decoration-none').click();
        cy.url().should('include', '/profile/');
    });

    it("Attempting to submit an empty comment should show an error", () => {
        cy.contains('Submit').click();
        cy.contains('Comments should not be empty').should('exist');
    });

    it("Attempting to submit an empty reply should show an error", () => {
        cy.contains('reply').click();
        cy.get('.col-11 > .flex-row > .btn').click();
        cy.contains('Comments should not be empty').should('exist');
    });

});

describe("post page - logged in", () => {
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
        cy.get(':nth-child(1) > .col-10 > h4 > .text-decoration-none').click();
    });

    it("User should be able to submit a new comment", () => {
        cy.get('.form-control').type("Test comment");
        cy.get('.comment-form > .d-flex > .btn').click();

        cy.contains("Comment succesfully submitted!").should('exist');
    });

    it("User should be able to have the option to edit or delete a comment", () => {
        cy.contains("edit").should('exist');
        cy.contains("delete").should('exist');
    });

    it("User should be able to edit a comment", () => {
        cy.contains("edit").click();
        cy.get('.col-11 > .flex-row > .form-control').should('be.visible');
        cy.get('.col-11 > .flex-row > .form-control').click().type(" new text added!");
        cy.get('.col-11 > .flex-row > .btn').click();

        cy.contains("Comment succesfully edited!").should('exist');
    });

    it("Clicking an upvote arrow on an already upvoted comment should remove the upvote", () => {
        cy.get(':nth-child(3) > :nth-child(1) > .col-1 > :nth-child(1) > img').click();
        cy.get(':nth-child(1) > .col-11 > .d-flex > .fw-bold').should('have.text', "0")

        cy.get(':nth-child(3) > :nth-child(1) > .col-1 > :nth-child(1) > img').click();
    });

    it("Clicking an upvote arrow on an already upvoted comment should add the upvote to the post", () => {
        cy.get('.post-page-button-cont > :nth-child(1) > img').click();
        cy.get('.likes-text').should('have.text', "2");

        cy.get('.post-page-button-cont > :nth-child(1) > img').click();
    });
});