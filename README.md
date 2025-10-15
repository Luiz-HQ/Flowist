# Flowist ✨

<p align="center">
  <img width="1919" height="943" alt="Captura de tela 2025-09-28 025805" src="https://github.com/user-attachments/assets/cd3b2bc8-b3a3-428c-85f6-b9f534249324" />
</p>



<p align="center">
  Um moderno organizador de tarefas no estilo Kanban, construído com as mais recentes tecnologias web. Crie, gerencie e mova suas tarefas com uma interface fluida e intuitiva de arrastar e soltar.
</p>

<p align="center">
  <a href="https://flowist-seven.vercel.app" target="blank"><strong>Acesse a demonstração ao vivo »</strong></a> <a href="https://flowist-seven.vercel.app" target="blank">https://flowist-seven.vercel.app</a>
</p>

  ![Flowist-dashboard](https://github.com/user-attachments/assets/1cb390c7-d26b-4542-9b19-8cd85ae4d951)

## 📋 Sobre o Projeto

**Flowist** nasceu da necessidade de uma ferramenta de organização que fosse ao mesmo tempo poderosa e simples. Em vez de interfaces complexas, o foco aqui é na clareza e na agilidade. O layout Kanban permite uma visualização clara do progresso de cada tarefa, desde a sua criação até a conclusão, seguindo o fluxo: **A Fazer → Em Andamento → Concluído**.

Este projeto foi desenvolvido para demonstrar habilidades em desenvolvimento full-stack com um design responsivo e focado na experiência do usuário.

---

## 🚀 Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias:

- **Frontend:**
  - [**Next.js**](https://nextjs.org/) (React Framework)
  - [**Tailwind CSS**](https://tailwindcss.com/) (Estilização)
  - [**TypeScript**](https://www.typescriptlang.org/) (Tipagem)
- **Backend:**
  - **API Routes do Next.js** (Serverless Functions)
- **Testes (E2E):**
  - [Cypress](https://www.cypress.io/ ) (Para testes automatizados de ponta a ponta)
- **Interatividade:**
  - [**dnd-kit**](https://dndkit.com/) (Para a funcionalidade de Arrastar e Soltar)
- **UI/Componentes:**
  - [**shadcn/ui**](https://ui.shadcn.com/) (Componentes de UI, como Dialogs e Inputs)
- **Banco de Dados:**
  - [**MongoDB**](https://www.mongodb.com/)
- **Deploy:**
  - [**Vercel**](https://vercel.com/)

---

## ✨ Funcionalidades Principais

- ✅ **Gerenciamento Completo de Tarefas (CRUD):** Crie, leia, atualize e delete tarefas facilmente.
- ↔️ **Quadro Kanban Interativo:** Organize suas tarefas em colunas visuais.
- 👆 **Arrastar e Soltar (Drag and Drop):** Mova tarefas entre os status com um simples gesto.
- 📱 **Design Totalmente Responsivo:** Experiência de uso perfeita em desktops, tablets e celulares.
- 🔍 **Busca de Tarefas:** Encontre rapidamente a tarefa que você procura.
- 🔐 **Autenticação de Usuários:** Cada usuário tem seu próprio quadro de tarefas.

---

### ✨ Testes Automatizados com Cypress

Para garantir a qualidade e a estabilidade da aplicação, o projeto conta com uma suíte de testes End-to-End (E2E) que simula o comportamento do usuário e valida os fluxos críticos.

-   ✅ **Testes de Autenticação:** Cobertura completa do fluxo de cadastro e login.
-   ✅ **Testes de Gerenciamento de Tarefas (CRUD):** Validação da criação, edição e exclusão de tarefas.

**Para executar os testes localmente:**

1.  Siga os passos da seção "Como Executar o Projeto Localmente" para ter a aplicação rodando.
2.  Em um novo terminal, execute o comando para abrir a interface do Cypress:
    ```bash
    npx cypress open
    ```
    
---

## ⚙️ Como Executar o Projeto Localmente

Para rodar este projeto na sua máquina, siga os passos abaixo:

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/Luiz-HQ/Flowist.git
    ```

2.  **Navegue até o diretório:**

    ```bash
    cd .\Flowist\
    ```

3.  **Instale as dependências:**

    ```bash
    npm install
    ```
4. **Configure as variáveis de ambiente**

   Este projeto utiliza variáveis de ambiente para gerenciar chaves sensíveis. Para configurar seu ambiente local, siga os passos:

- Na raiz do projeto, crie uma cópia do arquivo `.env.example` e renomeie-a para `.env`. Você pode fazer isso com o seguinte comando:
    ```bash
    cp .env.example .env
    ```
- Abra o novo arquivo `.env` e substitua os valores de exemplo pelas suas próprias chaves de desenvolvimento. O arquivo `.env` é ignorado pelo Git por razões de segurança.

   ```env
     DATABASE_URL="sua_string_de_conexao_do_BancodeDados_aqui"

     NEXT_PUBLIC_JWT_SECRET="sua_chave_secreta_para_jwt_aqui_pode_ser_qualquer_string_longa_e_aleatoria"
   ```

5.  **Inicie o servidor de desenvolvimento:**

    ```bash
    npm run dev
    ```

6.  Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

---

## 👨‍💻 Autor

**Luiz Henrique**

- LinkedIn: [LinkedIn](https://www.linkedin.com/in/luizhenriquecomunicador/)
- GitHub: [Github](https://github.com/Luiz-HQ)
- Email: [luizhn1703@gmail.com](mailto:luizhn1703@gmail.com)
