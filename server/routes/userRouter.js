const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");
const validateMiddleware = require("../middleware/validate.middleware");
const authMiddleware = require("../middleware/authMiddleware");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");
const {registrationsValidators, loginValidators} = require("../validators/validators");

router.post('/registration', validateMiddleware(registrationsValidators) ,userController.registration);
router.post('/login', validateMiddleware(loginValidators), userController.login);
router.get('/auth', authMiddleware, userController.check);
router.get('/fetchUser', authMiddleware, userController.fetchUser);
router.get('/', checkRoleMiddleware("ADMIN"), userController.getAll);
router.put('/role', checkRoleMiddleware("ADMIN"), userController.updateUserRole);

module.exports = router;