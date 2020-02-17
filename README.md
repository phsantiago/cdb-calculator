# Calculadora de CDB
Como rodar a aplicação?
1. `yarn`
2. `yarn start`

Para rodar os testes:
`yarn test`

--- 

## Sobre o projeto
> "Write programs that do one thing and do it well. Write programs to work together." - Unix philosophy

São 4 pacotes em typescript dentro de um monorepo feito com Lerna. Essa decisão foi tomada para aumentar a reutilização e qualidade.

### @cdb-calculator/typings
Esse pacote contém tipos reutilizaveis pela aplicação, ajudando a manter o contrato entre o back e front. Então quando o back muda o contrato, da para saber exatamente quais impactos causados no front. Uma opção para isso era o `Pact`, porém temos a vantagem de ter tudo em typescript, e essa tipagem compartilhada resolve bem esse problema.

### @cdb-calculator/service-client
A ideia é ser uma SDK de front para consumir o back, com isso qualquer aplicação em javascript consegue consumir sem se preocupar com os detalhes de implementação do HTTP.


### spa
A parte do front feita com React, utilizando hooks, alguns componentes como botão estão prontos para virarem mais um pacote podendo fazer parte de um design system e aumentando mais ainda a reutilização.

### calculator-service
Backend em node utilizando framework NestJS, possui apenas 2 chamadas, um health check e o calculo do cdb. O back tem os dados de mercado e a cada chamada aplica transformações a ele, com funções sem efeitos colaterais.
