# Migration with Sequelize Typescript

The community, generally, takes one of two approaches to migrations when using sequelize-typescript. Users will either utilize the sequelize CLI to generate their migrations and execute them, or use a standalone migration tool (like db-migrate).

Any tool you choose for your project should be evaluated in context. Using the Sequelize CLI might be perfect, or maybe db-migrate would be better, or perhaps another standalone migration tool would be a better fit. Do whatever you are most comfortable with - which ever tool you can weild the best.

In this document, we will show you how to use both the Sequelize CLI and a standalone tool, db-migrate, to manage migrations. It should provide enough detail and overview to give you the mental model to use any migration tool.

## Migrations with Sequelize CLI + Sequelize Typescript

To setup a project with sequelize, sequelize-cli, and sequelize-typescript ensure you have installed all the modules.

```
npm i -P sequelize sequelize-typescript sequelize-cli
```

In order to customize the cli to match your project structure, go ahead and make a `.sequelizerc` file at the root of your project:

:o
```

```

The Sequelize CLI can help you generate some of the contents of the up/down scripts *when you generate a new model*, but it _cannot_ handle complex instructions or anything beyond declaring new columns (essentially). The CLI does not inspect the model files to generate new code, essentially. But it can do more than an ordinary stand alone tool can.



## Migrations with db-migrate

`db-migrate` is a lightweight CLI tool that executes down and up scripts in a migration file. It does a few other things you would expect from a migration solution - _but it can't help you generate the content of the migration file_.

Using db-migrate is pretty straightforward; first make sure you have all the modules installed.

```
npm i -P sequelize sequelize-typescript db-migrate
```

Then you need to configure db-migrate to connect to your database. You just need to provide a [json file](https://db-migrate.readthedocs.io/en/latest/Getting%20Started/configuration/) to db-migrate, it can be anywhere in your project as you can provide a path in an npm script to point to it. Here's an example of the json file:

```json
{
  "dev": {
    "driver": "mysql",
    "user": { "ENV": "MYSQL_USER" },
    "password": { "ENV": "MYSQL_PASS" },
    "database": { "ENV": "MYSQL_DATABASE" },
    "host": { "ENV": "MYSQL_HOST" },
    "multipleStatements": true
  },
  "prod": {
    "driver": "mysql",
    "user": { "ENV": "MYSQL_USER" },
    "password": { "ENV": "MYSQL_PASS" },
    "database": { "ENV": "MYSQL_DATABASE" },
    "host": { "ENV": "MYSQL_HOST" },
    "multipleStatements": true
  }
}
```

_Note the multipleStatements property - it is very important with mysql!_

You can then edit your [npm scripts](https://docs.npmjs.com/cli/run-script) in your `package.json` file to run db-migrate commands, again, an example:

```json
{
  "scripts": {
    "db:new-migration": "db-migrate create --config config/migrations.json -e dev",
    "db:migrate": "db-migrate up --config config/migrations.json -e dev",
    "db:migrate-1": "db-migrate up -c 1 --config config/migrations.json -e dev",
    "db:down-1": "db-migrate down -c 1 --config config/migrations.json -e dev",
    "db:down-all": "db-migrate reset --config config/migrations.json -e dev"
  }
}
```

Feel free to change the scripts for your project or preference. You can even directly call the db-migrate script instead of doing `npm run ...` by providing the path to the binary like `./node_modules/db-migrate/bin/db-migrate create ...`. Or you can globally install db-migrate with `npm i -g db-migrate` and then just run `db-migrate create ...`. Feel free to adopt whichever works better for you.
