  # CypressTestes
testes automatizados de back e front com Cypress

Para rodar os testes na sua máquina, baixe o projeto localmente, abra o Terminal e rode os seguintes comandos: 

Para rodar Todos os testes -> 
npm run cypress:open *( esse modo roda em headless - sem tela )*

Para rodar abrindo a tela e mantendo a tela após a execução:
npm run cypress:open --headed --no-exit

## Para rodar uma pasta específica: ##
npm run cypress:run -- --spec "cypress/integration/a.TestesBackEnd/**/*.spec.js" --headed --no-exit

## Para rodar uma pasta específica abrindo o navegador e mantendo a tela após a execução: ##
npm run cypress:run -- --spec "cypress/integration/a.TestesBackEnd/**/*.spec.js" --headed --no-exit

## **Pastas que podem ser rodadas uma a uma:** ## 
- a.TestesBackEnd
- a.TestesFrontEnd
- a.TestesFuncionaisComMock
-  testesCurso -> Testes iniciais do curso 
- examples -> Testes do próprio Cypres, não quis excluir essa pasta do projeto.

  *Divirtam-se !! abs.*

