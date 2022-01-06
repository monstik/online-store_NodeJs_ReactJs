const Router = require("express");
const router = new Router();
const deviceController = require("../controllers/deviceController");
const authMiddleware = require("../middleware/authMiddleware");

router.post('/',authMiddleware , deviceController.create);
router.get('/', deviceController.getAll);
router.get('/search', deviceController.searchDevice);
router.get('/:id', deviceController.getOne);
router.put('/',authMiddleware, deviceController.updateDevice);

module.exports = router;