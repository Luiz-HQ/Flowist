describe("Create task flow", () => {
  // O bloco beforeEach roda ANTES de cada teste 'it()' dentro deste 'describe'.
  beforeEach(() => {
    // Usa o comando personalizado para fazer login.
    // O Cypress vai restaurar a sessão se já tiver uma, tornando isso super rápido.
    cy.login("luizdev17@email.com", "luizdev17");

    // Após o login, visita a página do dashboard para garantir um estado inicial limpo.
    cy.visit("https://flowist-seven.vercel.app/dashboard");
  });

  it("Should allow create a new task with to-do status", () => {
    //
    const taskTitle = `Nova tarefa de teste - ${new Date().getTime()}`;

    cy.contains("button", "Criar Tarefa").click();

    cy.get('div[role="dialog"]').should("be.visible");
    cy.contains("h2", "Criar Tarefa").should("be.visible");

    cy.get("input#title").type(taskTitle);
    cy.get("input#description").type("Esta é uma descrição de teste.");

    cy.contains("button", "Salvar Tarefa").click();

    cy.get('div[role="dialog"]').should("not.exist");

    cy.contains("h3", "A fazer").parent().should("contain.text", taskTitle);
  });

  it("Should allow create a new task with In progress status", () => {
    const taskTitle = `Tarefa Em Andamento - ${new Date().getTime()}`;
    cy.contains("button", "Criar Tarefa").click();
    cy.get("input#title").type(taskTitle);
    cy.get("input#description").type("Esta é uma descrição de teste.");

    cy.get('input[value="inProgress"]').click();
    cy.contains("button", "Salvar Tarefa").click();

    cy.contains("h3", "Em andamento")
      .parent()
      .should("contain.text", taskTitle);
  });

  it("Should allow create a new task with done status", () => {
    const taskTitle = `Tarefa Concluída - ${new Date().getTime()}`;
    cy.contains("button", "Criar Tarefa").click();
    cy.get("input#title").type(taskTitle);
    cy.get("input#description").type("Esta é uma descrição de teste.");

    cy.get('input[value="done"]').click();
    cy.contains("button", "Salvar Tarefa").click();

    cy.contains("h3", "Concluído").parent().should("contain.text", taskTitle);
  });
});
