import knex from 'knex';
// import betterSQL from 'better-sqlite3';

const db = knex({
    client: 'better-sqlite3',
    connection: {
        filename: './db.sqlite',
    },
    useNullAsDefault: true,
    debug: true,
});

// const rawQuery = new betterSQL('./db.sqlite');

db.schema.createTable('pastes', (table) => {
    table.increments('id')
    table.string('content').notNullable()
    table.string('slug').notNullable()
})

export default db;