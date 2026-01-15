const router = require("express").Router();
const noteController = require("../controller/note.controller");

router.post("/create", noteController.createNote);
router.get("/get", noteController.getNotes);
router.put("/update/:id", noteController.updateNote);
router.delete("/delete/:id", noteController.deleteNote);
router.get("/get/:id", noteController.getNote);

module.exports = router;