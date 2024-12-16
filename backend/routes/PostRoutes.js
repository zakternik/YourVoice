var express = require("express");
var router = express.Router();
var PostController = require("../controllers/PostController.js");

function requiresLogin(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  } else {
    var err = new Error("You must be logged in to view this page");
    err.status = 401;
    return next(err);
  }
}

router.get("/", PostController.list);

router.get("/:id", PostController.show);

router.post("/", PostController.create);

router.put("/:id", PostController.update);

router.delete("/:id", PostController.archive);
router.put("/:id/unarchive", PostController.unArchive);
router.delete("/:id/delete", PostController.remove);

router.post("/:id/comment", PostController.addComment);
router.delete("/:id/comment/:commentId", PostController.removeComment);

module.exports = router;
