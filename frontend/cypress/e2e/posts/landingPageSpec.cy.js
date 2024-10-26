describe("landing page - not an admin", () => {
    beforeEach(() => {
        cy.visit(
            "http://1822-team-1-website-production.s3-website-us-east-1.amazonaws.com"
        );
    });


})

describe("landing page - not an admin", () => {
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



})