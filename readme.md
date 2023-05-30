<!DOCTYPE html>
<html>
  <head>
    <title>Testes em Cypress</title>
    <style>
      .h1 {
        margin: 0;
      }
    </style>
  </head>
  <body>
    <h1>Testes em Cypress</h1>

    <hr />
    <p>
      Este repositório conta com os testes criados automaticamente no momento da
      instalação do Cypress.
    </p>

    <h3 style="margin-bottom: 0px">Além disso</h3>

    <ul>
      <li>
        <label> Teste Automático no GitHub </label>
        <ul>
          <li>
            <strong>GitHub Actions:</strong> ao mandar qualquer commit para o
            repositório é executado os testes. Esses testes automáticos foram
            configurados por meio do arquivo
            <a
              href="https://github.com/limajonatas/tests_with_cypress/blob/main/.github/workflows/ci.yml"
            >
              ci.yml
            </a>
          </li>
        </ul>
      </li>
      <li>Outros Testes adicionados</li>
    </ul>
    <br />

    <h3 style="margin-bottom: 0px">Cypress</h3>
    <sup
      ><a
        href="https://docs.cypress.io/guides/getting-started/installing-cypress"
      >
        Doc
      </a>
    </sup>

    <p>Passos para instalar e executar os testes:</p>

    <ol>
      <li>
        Instalar:<span style="background-color: rgba(128, 128, 128, 0.381)">
          <code> npm install cypress --save-dev</code></span
        >
        ou
        <span style="background-color: rgba(128, 128, 128, 0.381)"
          ><code> yarn add cypress --dev</code></span
        >
      </li>
      <li>
        Abrir:
        <span style="background-color: rgba(128, 128, 128, 0.381)"
          ><code>npx cypress open</code></span
        >
        ou
        <span style="background-color: rgba(128, 128, 128, 0.381)"
          ><code>yarn run cypress open</code></span
        >
      </li>
      <li>Executar os testes no prompt</li>
    </ol>
  </body>
</html>
