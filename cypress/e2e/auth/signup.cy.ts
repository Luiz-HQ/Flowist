describe("User register flow", () => {
  it("Should allow a new user to register successfully", () => {
    cy.visit("https://flowist-seven.vercel.app/");

    cy.contains("Button", "Login").click();

    cy.url().should("include", "/login");

    cy.contains("button", "Cadastrar").click();

    const randomId = new Date().getTime();
    const userEmail = `teste${randomId}@exemplo.com`;

    cy.get("#register-name").type(`User ${randomId}`);

    cy.get("#register-email").type(userEmail);

    cy.get("#register-password").type("senha123");

    cy.get("#register-confirm-password").type("senha123");

    cy.contains("button", "Criar conta").click();

    cy.contains(
      "Conta criada com sucesso! Faça o login para continuar."
    ).should("be.visible");
  });
});
