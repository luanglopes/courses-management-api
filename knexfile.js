module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3',
    },
    useNullAsDefault: false,
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: './tests/test.sqlite3',
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
