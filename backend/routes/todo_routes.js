const {
  createTodo,
  showTodos,
  singleTodo,
  updateTodo,
  deleteSingleTodo,
} = require("../controller/view.js");

const express = require("express");
const router = express.Router();

router.post("/createTodo", createTodo);
router.get("/showTodo", showTodos);
router.get("/showdetailTodo/:id", singleTodo);
router.patch("/updateTodo/:id", updateTodo);
router.delete("/deleteTodo/:id", deleteSingleTodo);

module.exports = router;
