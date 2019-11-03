module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3',
    },
    useNullAsDefault: false,
  },
  production: {
    client: 'sqlite3',
    connection: {
      filename: './prod.sqlite3',
    },
    useNullAsDefault: false,
  },
}
