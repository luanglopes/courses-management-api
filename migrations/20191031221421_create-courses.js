exports.up = knex => {
  return knex.schema.createTable('courses', table => {
    table.increments()
    table.string('name')
    table.text('description')
  })
}

exports.down = knex => {
  return knex.schema.hasTable('courses').then(exists => {
    if (exists) {
      return knex.schema.dropTable('courses')
    }
  })
}
