/// <reference types="cypress" />

// Bem-vindo ao Cypress!
//
// Este arquivo de especificação contém uma variedade de testes de exemplo
// para um aplicativo de lista de tarefas que foram projetados para demonstrar
// o poder de escrever testes no Cypress.
//
// Para aprender mais sobre como o Cypress funciona e
// o que o torna uma ferramenta de teste tão incrível,
// por favor, leia nosso guia de introdução:
// https://on.cypress.io/introduction-to-cypress

describe("exemplo de aplicativo de lista de tarefas", () => {
  beforeEach(() => {
    // O Cypress começa com uma página em branco para cada teste
    // então devemos dizer a ele para visitar nosso site com o comando cy.visit().
    // Como queremos visitar a mesma URL no início de todos os nossos testes,
    // incluímos isso em nossa função beforeEach para que seja executado antes de cada teste
    cy.visit("https://example.cypress.io/todo");
  });

  it("exibe dois itens de tarefa por padrão", () => {
    // Usamos o comando cy.get() para obter todos os elementos que correspondem ao seletor.
    // Em seguida, usamos should para afirmar que existem dois itens correspondentes,
    // que são os dois itens padrão.
    cy.get(".todo-list li").should("have.length", 2);

    // Podemos ir ainda mais longe e verificar se as tarefas padrão contêm
    // o texto correto. Usamos as funções `first` e `last`
    // para obter apenas o primeiro e o último elementos correspondentes individualmente,
    // e então realizamos uma afirmação com `should`.
    cy.get(".todo-list li").first().should("have.text", "Pay electric bill");
    cy.get(".todo-list li").last().should("have.text", "Walk the dog");
  });

  it("Não existe Hello World, dev :(", () => {
    cy.contains("Hello World").should("not.exist");
  });

  it("pode adicionar novas tarefas", () => {
    // Vamos armazenar nosso texto de item em uma variável para reutilizá-lo
    const newItem = "Alimente o gato";
    const newItem2 = "Alimente o cachorro";
    const newItem3 = "Alimente o peixe";

    // Vamos obter o elemento de entrada e usar o comando `type` para
    // inserir nosso novo item na lista. Após digitar o conteúdo do item,
    // também precisamos digitar a tecla Enter para enviar a entrada.
    // Essa entrada tem um atributo data-test, então vamos usá-lo para selecionar o
    // elemento de acordo com as melhores práticas:
    // https://on.cypress.io/selecting-elements
    //[data-test=new-todo] significa que estamos selecionando o
    //elemento que possui o atributo data-test com o valor new-todo
    cy.get("[data-test=new-todo]").type(`${newItem}{enter}`);
    cy.get("[data-test=new-todo]").type(`${newItem2}{enter}`);
    cy.get("[data-test=new-todo]").type(`${newItem3}{enter}`);

    // Agora que digitamos nosso novo item, vamos verificar se ele foi realmente adicionado à lista.
    // Como é o item mais recente, ele deve existir como o último elemento na lista.
    // Além disso, com os dois itens padrão, devemos ter um total de 3 elementos na lista.
    // Como as asserções retornam o elemento em que foram aplicadas,
    // podemos encadear essas duas asserções em uma única declaração.
    cy.get(".todo-list li")
      .should("have.length", 5)
      .last()
      .should("have.text", newItem3);
  });

  it("pode marcar um item como concluído", () => {
    // Além de usar o comando get para obter um elemento pelo seletor,
    // também podemos usar o comando contains para obter um elemento pelo seu conteúdo.
    // No entanto, isso retornará a <label>, que é o elemento de nível mais baixo que contém o texto.
    // Para marcar o item, encontraremos o elemento <input> correspondente a este <label>
    // navegando pelo DOM até o elemento pai. A partir daí, podemos usar o find
    // para encontrar o elemento <input> filho do checkbox e usar o comando check para marcá-lo.
    cy.contains("Pay electric bill")
      .parent()
      .find("input[type=checkbox]")
      .check();

    // Agora que marcamos o botão, podemos verificar se o elemento da lista agora está marcado como concluído.
    // Novamente, usaremos `contains` para encontrar o elemento <label> e, em seguida, usaremos o comando `parents`
    // para navegar vários níveis até encontrarmos o elemento <li> correspondente.
    // Depois de obter esse elemento, podemos afirmar que ele tem a classe "completed".
    cy.contains("Pay electric bill")
      .parents("li")
      .should("have.class", "completed");
  });

  context("com uma tarefa marcada", () => {
    beforeEach(() => {
      // Vamos usar o comando que usamos acima para marcar um elemento
      // Como queremos realizar vários testes que começam marcando
      // um elemento, colocamos isso no gancho beforeEach
      // para que seja executado no início de cada teste.
      cy.contains("Pay electric bill")
        .parent()
        .find("input[type=checkbox]")
        .check();
    });

    it("pode filtrar tarefas não concluídas", () => {
      /* Vamos clicar no botão "Ativo" para
       exibir apenas os itens incompletos */
      cy.contains("Active").click();

      /* Após filtrar, podemos afirmar que há apenas um
       item incompleto na lista. */
      cy.get(".todo-list li")
        .should("have.length", 1)
        .first()
        .should("have.text", "Walk the dog");

      // Para garantir, também vamos afirmar que a tarefa que marcamos
      // não existe na página.
      cy.contains("Pay electric bill").should("not.exist");
    });

    it("Pode filtrar por tarefas concluídas", () => {
      //Nós podemos executar etapas semelhantes ao teste acima para garantir
      // que apenas as tarefas concluídas sejam exibidas
      cy.contains("Completed").click();

      cy.get(".todo-list li")
        .should("have.length", 1)
        .first()
        .should("have.text", "Pay electric bill");

      cy.contains("Walk the dog").should("not.exist");
    });

    it("Pode apagar todas as tarefas concluídas", () => {
      /* Primeiro, vamos clicar no botão "Limpar tarefas concluídas" 
      `contains` está realmente servindo dois propósitos aqui.
      Primeiro, ele garante que o botão exista dentro do dom.
      Este botão só aparece quando pelo menos uma tarefa é marcada
      então este comando está implicitamente verificando se ele existe.
      Segundo, ele seleciona o botão para que possamos clicar nele. */
      cy.contains("Clear completed").click();

      /* Em seguida, podemos garantir que existe apenas um elemento
        na lista e nosso elemento não existe */
      cy.get(".todo-list li")
        .should("have.length", 1)
        .should("not.have.text", "Pay electric bill");

      /* Finalmente, verifique se o botão Limpar concluído não existe mais.*/
      cy.contains("Clear completed").should("not.exist");
    });
  });
});
