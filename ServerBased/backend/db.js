// db.js
const mongoose = require('mongoose');
const connectToMongoDB = async () => {
  try {
    // Replace with your MongoDB Atlas connection string
    const connectionString ="mongodb+srv://meghshah810:HqfZyJYgIafLj2tB@clusteripl.un4pu.mongodb.net/?retryWrites=true&w=majority&appName=ClusterIPL";
    // Connect to MongoDB
    await mongoose.connect(connectionString);
    console.log('Successfully connected to MongoDB Atlas');
  } catch (err) {
    console.error('Error connecting to MongoDB Atlas:', err);
  
  }
};
module.exports = connectToMongoDB;
