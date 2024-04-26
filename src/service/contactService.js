const Contact = require("../models/contactModel");
const User = require("../models/userModel");

async function manageContact(reqData) {
    const user = await User.findById(reqData.userId); // Assuming you pass userId in reqData

    if (!user) {
        throw new Error("User not found with id " + reqData.userId);
    }

    const contact = new Contact({
        user: user._id,
        name: reqData.name,
        email: reqData.email,
        phone: reqData.phone,
        message: reqData.message,
    });

    await contact.save();

    // Update the user document with the new contact
    user.contact.push(contact._id);
    await user.save();

    return contact;
}

async function getContact() {
    return await Contact.find({}).populate('user');
}

async function findContactById(id) {
    const contact = await Contact.findById(id).populate('user').exec();
  
    if (!contact) {
      throw new Error("Contact not found with id " + id);
    }
  
    return contact;
}

async function DeleteContact(contactId) {
    const contact = await findContactById(contactId);

    // Remove the contact from the associated user document
    await User.findByIdAndUpdate(contact.user, { $pull: { contact: contact._id } });

    await Contact.findByIdAndDelete(contactId);

    return "Contact deleted successfully";
}

module.exports = { manageContact, getContact, findContactById, DeleteContact };
