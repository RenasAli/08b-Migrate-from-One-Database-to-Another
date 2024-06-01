import dotenv from 'dotenv';
import sqlConnection from './databases/sqlConnection.js';
import mongoose from 'mongoose';

dotenv.config();
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const adminSchema = new mongoose.Schema({
  admin_name: String,
  role: String,
});
const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);

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
        await insertData(User, userData);
        await insertData(Admin, adminData);
    
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
async function insertData(Model, data) {
  try {
      await Model.insertMany(data);
      console.log(`Data inserted successfully into ${Model.modelName} collection.`);
  } catch (error) {
      console.log(`Error inserting data into ${Model.modelName} collection: `, error);
  }
}


migrateData()