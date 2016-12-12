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
    },
    'secret': 'ilovescotchyscotch',
    // 'database': 'mongodb://localhost:27017/incall',
};

module.exports = config;