const heroSection = require("../service/heroSection")

const manageHeroSection = async (req, res) => {
    try {
        const herosection = await heroSection.manageHeroSection(req.body)
        return res.status(201).send(herosection);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const getHeroSection = async (req, res) => {
    // const productId = req.params.id;
    try {
        const getHerosections = await heroSection.getHeroSection()
        return res.status(201).send(getHerosections);
    } catch (error) {
        return res.status(500).send({ error: "error aaya hai ji" });
    }
}

const deleteHeroSection = async (req, res) => {
    const heroSectionId = req.params.id;
    try {
        const herosection = await heroSection.DeleteHeroSection(heroSectionId)
        return res.status(201).send(herosection);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

module.exports = {manageHeroSection , getHeroSection, deleteHeroSection}
