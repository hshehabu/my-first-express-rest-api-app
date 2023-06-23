module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: "localhost",
      user: "root",
      password: "",
      database: "courses",
    },
    migrations: {
      directory: "./migrations",
    },
  },
};
