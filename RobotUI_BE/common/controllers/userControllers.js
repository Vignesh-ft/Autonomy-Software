const bcrypt = require('bcrypt'); // Import bcrypt
const User = require('../models/userModels'); // Import User model

// Create user function
const createUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    console.log('Received user creation request:', { username, password, role });

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let permissions = {};
    if (role === 'Administrator') {
      permissions = {
        maps: { enable: true, create: true, edit: true, delete: true , view: true},
        mission: { enable: true, create: true, edit: true, delete: true , view: true },
        transition: { enable: true, create: true, edit: true, delete: true , view: true },
        paths: { enable: true, create: true, edit: true, delete: true , view: true},
      };
    } else if (role === 'User') {
      permissions = {
        maps: { enable: true, create: true, edit: false, delete: false, view: true },
        mission: { enable: true, create: true, edit: false, delete: false, view: true},
        transition: { enable: true, create: true, edit: false, delete: false, view: true},
        paths: { enable: true, create: true, edit: false, delete: false, view: true },
      };
    } else if (role === 'Maintainer') {
      permissions = {
        maps: { enable: true, create: false, edit: false, delete: false,  view: true },
        mission: { enable: true, create: false, edit: false, delete: false, view: true},
        transition: { enable: true, create: false, edit: false, delete: false, view: true},
        paths: { enable: true, create: false, edit: false, delete: false, view: true },
      };
    }

    console.log('Setting permissions:', permissions);

    const newUser = new User({
      username,
      password: hashedPassword,
      role,
      permissions
    });

    await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      role: newUser.role,
      permissions: newUser.permissions
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUserPermissions = async (req, res) => {
  const { username } = req.params;
  const { permissions } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { username },
      { permissions },
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
  } catch (error) {
    console.error('Error updating permissions:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'username role');
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllUsersPermissions = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ permissions: user.permissions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const username = req.params.username;

    // Check if the user exists before deletion
    const user = await User.findOne({username : username});

    const deletedUser = await User.findByIdAndDelete(user._id);
    if (!deletedUser) {
      console.log('User not found:', username);
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('User deleted successfully:', deletedUser);
    res.status(200).json({
      message: 'User deleted successfully',
      deletedUser
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(400).json({ error: error.message });
  }
};


// Export the controller functions
module.exports = { createUser, updateUserPermissions, getAllUsers, deleteUser, getAllUsersPermissions };
