const bcrypt = require('bcrypt')

exports.seed = knex => {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(async () => {
      const passowrdHash = await bcrypt.hash('admin', 10)

      return knex('users').insert([
        {
          id: 1,
          name: 'admin',
          email: 'admin@example.com',
          password: passowrdHash,
        },
      ])
    })
}
