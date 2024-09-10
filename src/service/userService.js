const User = require("../models/userModel")
const bcrypt = require("bcrypt");
const jwtProvider = require("../config/jwtProvider");
const Address = require("../models/addressmodel");

const createUser = async (userData) => {
    try {
        let { firstName, lastName, email, password } = userData;
        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
            throw new Error("User already exists with email: ", email);
        }
        password = await bcrypt.hash(password, 8);
        const user = await User.create({ firstName, lastName, email, password });
        console.log("Created user",user);
        return user;
    } catch (error) {
        throw new Error(error.message)
    }
}
const findUserById = async (userId) => {
    try {
        const user = await User.findById(userId).populate("address");
        if (!user) {
            throw new Error("User not found with id: ",userId);
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({email});
        if (!user) {
            throw new Error("User not found with id: ", email);
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

const getUserProfileByToken = async( token ) => {
    try {
        const userId = jwtProvider.getUserIdFromToken(token)

        const user = await findUserById(userId)
        if (!user) {
            throw new Error("User not found with id: ", userId);
        }
        return user;
        
    } catch (error) {
        throw new Error(error.message);
    }
}

const getAllUsers = async () => {
    try {
        const users = await User.find()
        return users
    } catch (error) {
        throw new Error(error.message);
    }
}
const updateUserProfile = async (userId, updateData) => {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { $set: updateData },
        { new: true }
      ).populate("address");
      
      if (!user) {
        throw new Error("User not found");
      }
      
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  const addAddress = async (userId, addressData) => {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      
      user.address.push(addressData);
      await user.save();
      
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  const updateAddress = async (userId, addressId, addressData) => {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      
      if (!user.address.includes(addressId)) {
        throw new Error("Address not found for this user");
      }
  
      const updatedAddress = await Address.findByIdAndUpdate(
        addressId,
        { $set: addressData },
        { new: true, runValidators: true }
      );
  
      if (!updatedAddress) {
        throw new Error("Address not found");
      }
  
      return { user, updatedAddress };
    } catch (error) {
      console.error('Error in updateAddress service:', error);
      throw new Error(error.message);
    }
  };
  
  const deleteAddress = async (userId, addressId) => {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      
      user.address = user.address.filter(addr => addr._id.toString() !== addressId);
      await user.save();
      
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  };


module.exports = {createUser , findUserById, getUserByEmail, getUserProfileByToken, getAllUsers, updateUserProfile, addAddress, updateAddress, deleteAddress }