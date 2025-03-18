const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '../../.env' });

const User = require('../../models/User');

async function createAdmin() {
    try {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        const mongoUri = process.env.MONGO_URI;
      
        await mongoose.connect(mongoUri);

        //check if admin already exists
        const existingAdmin = await User.findOne( {email: adminEmail} );
        if (existingAdmin) {
            console.log('Admin already exists.');
            mongoose.connection.close();
            return;
        }

        const newAdmin = new User({
            name: "Admin",
            email: adminEmail,
            password: adminPassword,
            role: "admin",
        });

        await newAdmin.save();

        if (newAdmin) {
            console.log('Admin created successfully!', newAdmin);
        }
    } 
    catch (error) {
        console.error('Error creating admin:', error.message);
    } 
    finally {
        mongoose.connection.close();  
    }
}

createAdmin();
