module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./training.db",
    },
    useNullAsDefault: true,
  },
};
