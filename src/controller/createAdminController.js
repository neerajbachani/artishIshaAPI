const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const createAdminUser = async (req, res) => {
  try {
    const adminEmail = process.env.adminEmail;
    const adminPassword = await bcrypt.hash(process.env.adminPassword, 10);

    const adminUser = new User({
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
      firstName: 'Neeraj', // Add a firstName value
      lastName: 'Admin', // Add a lastName value
    });

    await adminUser.save();
    res.status(200).json({ message: 'Admin user created successfully' });
  } catch (err) {
    console.error('Error creating admin user:', err);
    res.status(500).json({ message: 'Error creating admin user' });
  }
};

module.exports = { createAdminUser };