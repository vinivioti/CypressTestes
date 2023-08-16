  # CypressTestes
testes automatizados de back e front com Cypress

Clone o projeto para uma pasta qualquer em seu SO

```bash 
git clone https://github.com/vinivioti/CypressTestes.git
```
# Instalando

Execute o comando para baixar e instalar todas as dependências do projeto (package.json):

```bash
npm i
```

Instale o cypress usando npm. Através do CDM, na pasta do projeto, execute o seguinte comando
```bash
npm i cypress -D
```
# Executando:

```bash
npm run cypress:run   *( esse modo rodará todos os testes headless - sem tela - )*
```
```bash
npm run cypress:open   *( esse modo abrirá uma tela Cypress e vc pode escolher os cenários, clicando sobre eles na tela nova )*
```
*Para rodar abrindo a tela e mantendo-a aberta após a execução:*
```bash
npm run cypress:run --headed --no-exit
```
## Para rodar uma pasta específica: ##

***(Modo com tela aberta):
```bash
npm run cypress:run -- --spec "./cypress/integration/a.TestesBackEnd/**/*.spec.js" --headed --no-exit   
```
***(modo headless - sem tela):
```bash
npm run cypress:run -- --spec "./cypress/integration/a.TestesBackEnd/**/*.spec.js"   
```

## **Pastas que podem ser rodadas uma a uma:** ## 
- a.TestesBackEnd
- a.TestesFrontEnd
- a.TestesFuncionaisComMock
-  testesCurso -> Testes iniciais do curso 
- examples -> Testes do próprio Cypres, não quis excluir essa pasta do projeto.

  *Divirtam-se !! abs.*

