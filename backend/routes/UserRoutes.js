var express = require("express");
var router = express.Router();
var UserController = require("../controllers/UserController.js");

/*
 * GET
 */
router.get("/", UserController.list);

// GET USER
router.get("/:id", UserController.show);
router.get("/:id/posts", UserController.showPosts);
/*

 * POST
 */
router.post("/", UserController.create);

router.post("/login", UserController.login);

/*
 * PUT
 */
router.put("/:id", UserController.update);

/*
 * DELETE
 */
router.delete("/:id", UserController.remove);

module.exports = router;
