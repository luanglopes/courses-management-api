exports.up = knex => {
  return knex.schema.createTable('courses_users', table => {
    table.increments()
    table.integer('course_id').unsigned()
    table.integer('user_id').unsigned()
    table.foreign('course_id').references('courses.id')
    table.foreign('user_id').references('users.id')
    table.index(['course_id', 'user_id'])
  })
}

exports.down = knex => {
  return knex.schema.hasTable('courses_users').then(exists => {
    if (exists) {
      return knex.schema.dropTable('courses_users')
    }
  })
}
