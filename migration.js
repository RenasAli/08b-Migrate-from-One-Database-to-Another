import dotenv from 'dotenv';
import sqlConnection from './databases/sqlConnection.js';
import mongoose from 'mongoose';

dotenv.config();

async function migrateData(){

    sqlConnection.connect();
    
    await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    try{

        const userData = await queryMySQL(sqlConnection, 'SELECT * FROM user');
        const adminData = await queryMySQL(sqlConnection, 'SELECT * FROM admin');
    
        // Transform and insert data into MongoDB
        await insertData('user', userData);
        await insertData('admin', adminData);
    
        console.log('Data migration completed successfully.');
        
    } catch(error){
        console.log('Error migrating data: ', error)
    } finally {
        // Close connections
        sqlConnection.end();
        await mongoose.disconnect();
    }
    
}

async function queryMySQL(connection, sqlQuery) {
    return new Promise((resolve, reject) => {
      connection.query(sqlQuery, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
}
async function insertData(collectionName, data) {
    const Model = mongoose.model(collectionName.charAt(0).toUpperCase() + collectionName.slice(1));
    await Model.insertMany(data);
}

migrateData()