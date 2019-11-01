exports.up = knex => {
  return knex.schema.createTable('lessons', table => {
    table.increments()
    table.string('name')
    table.text('description')
    table.integer('course_id').unsigned()
    table.foreign('course_id').references('courses.id')
  })
}

exports.down = knex => {
  return knex.schema.hasTable('lessons').then(exists => {
    if (exists) {
      return knex.schema.dropTable('lessons')
    }
  })
}
