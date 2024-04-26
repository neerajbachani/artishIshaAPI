const userService = require("../service/userService.js");
const jwtProvider = require("../config/jwtProvider.js");
const bcrypt = require("bcrypt")
const cartService = require("../service/cartService.js")

const register = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        const jwt = jwtProvider.generateToken(user._id);
        
        await cartService.createCart(user);
        const createdCart = await cartService.createCart(user);

        return res.status(200).send({ jwt, message: "register success", cart: createdCart });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const login = async (req, res) => {
    const { password, email } = req.body;
    try {
        const user = await userService.getUserByEmail(email);

        if (!user) {
            return res.status(404).send({ message: 'User not found with email:', email });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return res.status(401).send({message: 'Invalid Password'})
        }

        const jwt = jwtProvider.generateToken(user._id)
        return res.status(200).send({jwt,message: 'Login Success' })

    } catch (error) {
        // Handle error
        return res.status(500).send({error: error.message})

    }
}

const adminLogin = async (req, res) => {
    const { password, email } = req.body;
    try {
        // Check if the user's email and password match the admin credentials
        if (email !== 'jayshah@gmail.com' || password !== '1234') {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // You can optionally check if the user exists in your database here

        // Assuming the user is an admin, generate a JWT token
        const jwt = jwtProvider.generateToken('admin');

        return res.status(200).send({ jwt, message: "Admin login success" });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}




module.exports = { register, login, adminLogin}

