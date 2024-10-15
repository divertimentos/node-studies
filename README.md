# API design with NodeJS

![scott](https://github.com/divertimentos/node-studies/blob/main/media/scott-moss.png)

<!--toc:start-->

- [API design with NodeJS](#api-design-with-nodejs)
  - [Useful links](#useful-links)
  - [Entendendo os schemas e as models](#entendendo-os-schemas-e-as-models)
  - [Migrations](#migrations)
    - [Relacional vs não relacional](#relacional-vs-não-relacional)
      - [Bancos de dados relacionais](#bancos-de-dados-relacionais)
      - [Bancos de dados não relacionais (NoSQL)](#bancos-de-dados-não-relacionais-nosql)
    - [Migrando](#migrando)
  - [Rotas](#rotas)
    - [CRUDs](#cruds)
  - [Middlewares](#middlewares)
  - [Authentication](#authentication)
    - [JWT](#jwt)
    - [Criando usuários](#criando-usuários)
  - [Rotas e Tratamento de Erros](#rotas-e-tratamento-de-erros)
  <!--toc:end-->

## Useful links

- [Render](https://dashboard.render.com/)

## Entendendo os schemas e as models

Um produto pertence a um usuário. Qual é a relação? one-to-one? One-to-many? Many-to-many?

Um usuário pode ter muitos produtos, mas um produto não pode percenter a muitos usuários.

- `User` em relação a `Product` (one to many)
- `Product` para `User` (one to one)

Então, no schema de `Product` é preciso ter um campo `belongsToId`, significando que um produto pertence a um único usuário, referenciado pelo `id` dele.

```prisma
model Product {
  // (...)
  belongsToId String
}
```

Para setar a relação, usamos um campo `belongsTo` do tipo `User`, em vez de `String` (como acima feito anteriormente, no exemplo acima). Esse campo tem um atributo de relação. Nele setamos qual campo desse schema é responsável por guardar a relação. É o `belongsToId`. Em seguida, setamos qual campo em `User` guarda a referência do campo de `id` do User: `id`.

```prisma
model Product {
  // (...)
  belongsToId String
  belongsTo User @relation(fields: [belongsToId], references: [id])
}
```

Quando formatamos o arquivo (usando `npx prisma format` ou algum atalho no editor de código), o Prisma adiciona `Product Product[]` em `User`, para explicitar a relação que `User` tem com `Product`, na qual um usuário pode ter o campo `Product` e o tipo desse campo é uma lista (many!) de produtos.

Alteramos de `Product` para `products` para ficar mais coerente com os outros itens da model `User`

- Quando queremos limitar os caracteres de determinada string, usamos o decorador `@db.VarChar(255)`, sendo `255`o valor desejado.
- É curioso tentar interconectar os conhecimentos, partindo do front-end, que consome APIs, chegando no back-end novamnete, onde são configuradas todas as relações entre as informações. Fico imaginando se cada campo de cada schema vai se tornar uma propriedade no JSON final, e se cada Schema será um endpoint com seu respectivo payload sendo montado a partir dos campos e o resultado das relações.

## Migrations

Migração é um conceito presente quando se fala de bancos de dados relacionais. Migrar é ensinar ao banco qual é o formato das tabelas que ele deverá criar. Migrações també são usadas para atualizar o formato das tabelas, como por exemplo inserir um campo novo numa model. Bancos de dados non-SQL não utilizam esse conceito.

### Relacional vs não relacional

#### Bancos de dados relacionais

- Bancos de dados relacionais guardam valores em tabelas. Geralmente, essas tabelas possuem informações compartilhadas entre si, resultando em um relacionamento. Isso é o aspecto principal de um banco de dados relacional.
- As colunas da tabela definem informações a serem guardadas, enquanto as linhas guardam as informação em si. A relação é entre colunas, pois elas potencialmente guardam muitas linhas de uma vez.
- Segundo o blog do MongoDB, a melhor forma de interagir com bancos de dados relacionais é usando SQL, uma linguagem feita para fazer queries em bancos.

#### Bancos de dados não relacionais (NoSQL)

- Primeira coisa: bancos relacionais e não relacionais são proporcionais a bancos "SQL" e "NoSQL", e NoSQL significa "Not only SQL".
- Esse tipo de banco não utiliza tabelas, campos e colunas. Eles são pensados para ser _cloud-driven_.
- Esses bancos podem guardar dados em documentos, como em estruturas "_JSON-like_". Todas as informações ficam em um só lugar.

(Fonte: [Site do MongoDB](https://www.mongodb.com/resources/compare/relational-vs-non-relational-databases))

### Migrando

Nós conversamos com o banco usando o `prisma/client`. Até agora, só usamos o CLI do Prisma, basicamente para formatar o código da schema.

O comando para migrar é `npx prisma migrate dev --name init`.

## Rotas

![postman](https://github.com/divertimentos/node-studies/blob/main/media/postman.png)

### CRUDs

Diferentemente do que sempre ouvi de devs backend experientes, o CRUD é mais importante do que parece. Sempre ouvi pessoas fazendo troça de empresas que no anúncio da vaga esperam que você sabia ciência de foguete, para no dia a dia você fazer CRUD. Pelo que o Scott deu a entender, basicamente todo software com o qual interagimos é um CRUD. Então, se todo software é um CRUD, então nenhum é. O CRUD é apenas a premissa básica na qual o back-end se baseia.

O Scott disse que as APIs REST funcionaram até 2005 porque, a partir do momento que você tem qualquer relação entre colunas, você precisa decidir se toda a informação está naquele endpoint ou não, e nisso você precisa usar _query strings_ e, a partir disso, já está criando sua própria _query language_. Ok, mas então por que todo mundo usa APIs REST? Ou não se usa mais? Qual a alternativa para esse padrão? DBs não relacionais? Ele basicamente diz que só estamos usando ele nesse curso porque tudo usa esse padrão.

Criamos as rotas, prevenimos o "hanging" retornando alguma coisa quando é feito um request. Próximo passo é configurar um middleware entre a API e o banco

## Middlewares

Após instalar o Morgan, tem que instalar `@types/morgan` também.

Ao colocar `app.use(express.json())` como middleware, estamos permitindo que o cliente nos envie JSON. Ele só não explicou como isso acontece. Mas eu meio que entendi o que ele faz: se você roda o `app.use()` na raiz da aplicação, ele vai chamar essa função e aplicar o que ela retorna.

Middlewares são basicamente alterações nas configurações do seu servidor. O CORS é configurado como middleware, por exemplo.

## Authentication

### JWT

Lembrete de que CORS é diferente de autenticação. O CORS diz respeito ao tipo de request que pode ser feito, enquanto a autenticação é o "cara, crachá" relativo ao usuário.

- CORS: relativo à natureza do request
- Auth: relativo à identidade do cliente

O JWT (_JSON Web Token_) nos ajuda com a autenticação em DBs que são _multitenat_, ou seja, são DBs únicos compartilhados por vários usuários. O JWT nos ajuda a garantir que determinado usuário acesse apenas a parte do banco que lhe concerne.

O JWT é um modelo de criptografia. Dada uma chave, uma string, ele transforma um JSON numa string de caracteres (pseudo)aleatórios. Com essa mesma chave fazemos a decriptação. Segundo o Scott, entretanto, isso não é o mesmo que fazer _hashing_. Como não sei a diferença, fica pra um estudo posterior.

> **Disclaimer sobre o `dotenv`**: o servidor não carrega automaticamente as informações dentro dos arquivos `.env`. O `DATABASE_URL` só está funcionando porque é uma variável reservada do Prisma, que detecta e carrega. Para carregar o secret do JWT, precisamos da lib. Após importar tudo que está em `.env` como `*`, carregamos as variáveis de ambiente lá usando `dotenv.config()`. Fazemos isso no index porque queremos que ele seja carregado imediatamente junto com a aplicação, para que possamos acessá-lo usando o `process.env`.

Um detalhe é que, quando estamos trabalhando com NodeJS, o `try/catch` é importantíssimo para evitar que erros derrubem o servidor, como [neste exemplo aqui](https://github.com/divertimentos/node-studies/blob/d1b3557b03cdd8dc674002d564aaf4a24f93431a/src/modules/auth.ts#L28), reproduzido abaixo:

```typescript
// (...)
try {
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.user = user;
  next();
} catch (e) {
  console.error(e);
  res.status(401);
  res.json({ message: "Not valid token!" });
  return;
}
```

Para mais detalhes, consulte o link para o arquivo `modules/auth.ts`.

> Authentication is tough, and it gets tougher than this. But, for the most part, it's mostly just this... plus other stuff. ~ Scott Moss

Foco no "other stuff".

### Criando usuários

![prisma-studio](https://github.com/divertimentos/node-studies/blob/main/media/prisma-studio-users.png)

Algumas informações sobre a natureza assíncrona de algumas ações primordiais no back-end:

- Todo handler é uma função assíncrona
- porque toda função que acessa um banco é assíncrona.
- Toda query é assíncrona.
- Acessar um disco é uma tarefa assíncrona.

O Prisma oferece uma forma de visualizar seu banco de dados chamado Studio: `npx prisma studio`.

## Rotas e Tratamento de Erros

Essa parte de validação usando o `express-validator` eu não entendi muito bem. Talvez seja porque ainda não entendo muito bem como os _schemas_ funcionam.

(O Scott tinha que ter ensinado primeiro as funcionalidades, o CRUD inteiro, para depois tratar os aspectos da validação. Estamos validando sem entender muito bem o porquê.)

Tem algumas coisas relacionadas a migrações que o Scott não deixa muito claro porque talvez ele mesmo não tenha todas as respostas para isso. É um curso no qual devs front-end partem do zero em direção a construir uma API usando ferramentas que fazem parte do trabalho pesado para você, então algumas abstrações você não entende mesmo de cara. Esse é o tradeoff de ver algumas magiquinhas acontecendo entre o Prisma e o db: **em vez de entender o que está havendo, você entende a sintaxe da abstração que é o framework (ou o ORM, como neste caso)**.

As queries de databases começam a ficar complexas quando introduzimos os relacionamentos entre tabelas. Antes disso, é tudo direto e reto, uma query só e já era. Planejar como navegar pelos dados. Tem até um nome para isso, "query plan". Agora entendo o que devs back-end querem dizer quando falam sobre otimização de acesso ao banco; eles estão otimizando as queries para serem mais econômicas. Prós e contras, não há modelo ideal. Se bancos relacionais são amplamente usados até hoje, é porque valem a pena.
