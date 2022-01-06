const Router = require("express");
const router = new Router();
const typeController = require("../controllers/typeController");
const chekRole = require("../middleware/checkRoleMiddleware");
const {typesValidator} = require("../validators/validators");
const validateMiddleware = require("../middleware/validate.middleware");

router.post('/', chekRole('ADMIN'), validateMiddleware(typesValidator) ,typeController.create);
router.get('/', typeController.getAll);

module.exports = router;