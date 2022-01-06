const Router = require("express");
const router = new Router();
const brandController = require("../controllers/brandController");
const {brandValidator} = require("../validators/validators");
const validateMiddleware = require("../middleware/validate.middleware");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/',checkRole('ADMIN'), validateMiddleware(brandValidator), brandController.create);
router.get('/', brandController.getAll);

module.exports = router;