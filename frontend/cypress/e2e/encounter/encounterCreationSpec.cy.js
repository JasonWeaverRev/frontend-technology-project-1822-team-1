describe("/encounter-creation", () => {
  beforeEach(() => {
    cy.visit("https://http://localhost:3000/encounter-creation");
  });

  it("greets with Sign up", () => {
    cy.contains("h1", "Sign up");
  });
});
