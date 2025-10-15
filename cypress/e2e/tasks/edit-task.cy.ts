describe("Edit task flow", () => {
  beforeEach(() => {
    cy.login("luizdev17@email.com", "luizdev17");
    cy.visit("https://flowist-seven.vercel.app/dashboard");
  });

  it("Should allow edit a task", () => {
    const originalTitle = `Tarefa para Editar - ${new Date().getTime()}`;

    cy.contains("button", "Criar Tarefa").click();
    cy.get("input#title").type(originalTitle);
    cy.contains("button", "Salvar Tarefa").click();

    const updatedTitle = "Título Atualizado";
    cy.contains('[data-cy="task-card"]', originalTitle)
      .find('[aria-label="Editar tarefa"]')
      .click();

    cy.get('div[role="dialog"]').should("be.visible");
    cy.get("input#title").clear().type(updatedTitle);
    cy.contains("button", "Salvar Tarefa").click();

    cy.contains(updatedTitle).should("be.visible");
    cy.contains(originalTitle).should("not.exist");
  });
});
