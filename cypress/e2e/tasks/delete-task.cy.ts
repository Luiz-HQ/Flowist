describe("Delete task flow", () => {
  beforeEach(() => {
    cy.login("luizdev17@email.com", "luizdev17");
    cy.visit("https://flowist-seven.vercel.app/dashboard");
  });

  it("Should allow delete a task", () => {
    const taskTitle = `Tarefa para Deletar - ${new Date().getTime()}`;

    cy.contains("button", "Criar Tarefa").click();
    cy.get("input#title").type(taskTitle);
    cy.contains("button", "Salvar Tarefa").click();
    cy.contains(taskTitle).should("be.visible");
    // -----------------------------------------

    cy.contains(taskTitle)
      .parents('[data-cy="task-card"]')
      .find('[aria-label="Deletar tarefa"]')
      .click();

    cy.contains(taskTitle).should("not.exist");
  });
});
