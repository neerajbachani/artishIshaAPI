const jwtProvider = require("../config/jwtProvider.js");
const userService = require("../service/userService.js");

const authenticate = async (req, res, next) => {
 
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(404).send({ error: "Token not found....." });
        }

        const userId = jwtProvider.getUserIdFromToken(token);
        const user = await userService.findUserById(userId);
        req.user = user;

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
    next();
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }
  };

const localVariables = (req, res, next) => {
   console.log('local')
    req.app.locals = {
        OTP : null,
        resetSession: false
    }
    next()
}


module.exports = {authenticate, isAdmin}