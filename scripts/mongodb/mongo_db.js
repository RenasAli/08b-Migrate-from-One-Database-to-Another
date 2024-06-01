// Connect to the 'migrationdbmongo' database
db = db.getSiblingDB('migrationdbmongo');

// Create 'user' collection
db.createCollection('user');

// Create 'admin' collection
db.createCollection('admin');