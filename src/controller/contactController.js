const contact = require("../service/contactService")

const manageContact = async (req, res) => {
    try {
        const contactUs = await contact.manageContact(req.body)
        return res.status(201).send(contactUs);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const getContact = async (req, res) => {
    // const productId = req.params.id;
    try {
        const getContact = await contact.getContact()
        return res.status(201).send(getContact);
    } catch (error) {
        return res.status(500).send({ error: "error aaya hai ji" });
    }
}

const deleteContact = async (req, res) => {
    const contactId = req.params.id;
    try {
        const deleteContact = await contact.DeleteContact(contactId)
        return res.status(201).send(deleteContact);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

module.exports = {manageContact , getContact, deleteContact}