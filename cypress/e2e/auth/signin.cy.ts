describe("User login flow", () => {
  it("Should allow a user to login successfully", () => {
    cy.visit("https://flowist-seven.vercel.app");

    cy.contains("Button", "Login").click();

    cy.url().should("include", "/login");

    cy.get("#login-email").type("luizdev17@email.com");
    cy.get("#login-password").type("luizdev17");

    cy.contains("button", "Entrar").click();

    cy.url().should("include", "/dashboard");

    cy.contains("h1", "Bem vindo").should("be.visible");
  });
});
