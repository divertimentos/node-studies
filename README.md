# API design with NodeJS

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
  - [Middleware](#middleware)
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

### CRUDs

Diferentemente do que sempre ouvi de devs backend experientes, o CRUD é mais importante do que parece. Sempre ouvi pessoas fazendo troça de empresas que no anúncio da vaga esperam que você sabia ciência de foguete, para no dia a dia você fazer CRUD. Pelo que o Scott deu a entender, basicamente todo software com o qual interagimos é um CRUD. Então, se todo software é um CRUD, então nenhum é. O CRUD é apenas a premissa básica na qual o back-end se baseia.

O Scott disse que as APIs REST funcionaram até 2005 porque, a partir do momento que você tem qualquer relação entre colunas, você precisa decidir se toda a informação está naquele endpoint ou não, e nisso você precisa usar _query strings_ e, a partir disso, já está criando sua própria _query language_. Ok, mas então por que todo mundo usa APIs REST? Ou não se usa mais? Qual a alternativa para esse padrão? DBs não relacionais? Ele basicamente diz que só estamos usando ele nesse curso porque tudo usa esse padrão.

Criamos as rotas, prevenimos o "hanging" retornando alguma coisa quando é feito um request. Próximo passo é configurar um middleware entre a API e o banco

## Middleware
