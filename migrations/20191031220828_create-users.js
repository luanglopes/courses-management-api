exports.up = knex => {
  return knex.schema.createTable('users', table => {
    table.increments()
    table.string('name')
    table.string('email')
    table.string('password')
    table.unique('email')
  })
}

exports.down = knex => {
  return knex.schema.hasTable('users').then(exists => {
    if (exists) {
      return knex.schema.dropTable('users')
    }
  })
}
