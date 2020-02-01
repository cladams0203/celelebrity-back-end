
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments()
    tbl.string('username').notNullable().unique()
    tbl.string('password').notNullable()
  })
  .createTable('celebrity', tbl => {
    tbl.increments()
    tbl.string('name').notNullable()
    tbl.text('url')
    tbl.string('dob')
    tbl.boolean('dead').notNullable().defaultTo(false)
    })
    .createTable('scores', tbl => {
        tbl.increments()
        tbl.integer('score').notNullable()
        tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
    })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('scores')
        .dropTableIfExists('celebrity')
        .dropTableIfExists('users')
};
