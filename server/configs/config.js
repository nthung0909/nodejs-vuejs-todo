module.exports = {
    development: {
        mysql: {
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            dialect: "mysql",
            logging: false
        }
    },
    bcrypt: {
        saltRounds: 12
    }
}