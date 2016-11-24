var config = {
    database: {
        connectionString: "mongodb://localhost:27017/incall",
        databaseName: "incall"
    },
    debug: {
        database: {
            connectionString: "mongodb://localhost:27017/incall-dev",
            databaseName: "incall-dev"
        }
    }
};

module.exports = config;