const HeroSection = require("../models/heroSectionModel");
const { find } = require("../models/userModel");

async function manageHeroSection(reqData) {

    const heroSection = new HeroSection({

        image: reqData.image,
      
        title: reqData.title,
        
        link: reqData.link,
     
    })

    return await heroSection.save()
}

async function getHeroSection() {
    return await HeroSection.find({});
}

async function findHeroSectionById(id) {
    const herosection = await HeroSection.findById(id).exec();
  
    if (!herosection) {
      throw new Error("Product not found with id " + id);
    }
  
    return herosection;
}
async function DeleteHeroSection(heroSectionId) {
    const herosection = await findHeroSectionById(heroSectionId)

    await HeroSection.findByIdAndDelete(heroSectionId);

    return "herosection deleted successfully";
}

module.exports = {manageHeroSection , getHeroSection, findHeroSectionById, DeleteHeroSection}
