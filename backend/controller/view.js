const database = require("../db/db");

// create todo
exports.createTodo = (req, res) => {
  console.log(req.body);
  const { task_name, description } = req.body;
  const query = "INSERT INTO todos SET ?";

  if (!task_name || !description) {
    return res.status(400).json({
      error: "Please provide valid task_name and description",
    });
  }

  database.query(query, { task_name, description }, (err, result) => {
    if (err) {
      console.error("Error creating todo:", err);
      return res.status(500).json({ error: "Failed to create todo" });
    }
    return res.status(200).json(result);
  });
};

//SHOW TODOS
exports.showTodos = (req, res) => {
  const q = "SELECT * FROM todos";

  database.query(q, (err, result) => {
    if (err) return res.json(err);
    return res.status(200).json(result);
  });
};

//SHOW SINGLE TODO
exports.singleTodo = (req, res) => {
  const q = `SELECT * FROM todos where id=${req.params.id}`;

  database.query(q, (err, result) => {
    if (err) return res.json(err);
    return res.status(200).json(result[0]);
  });
};

// Update todo list
exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { task_name, description } = req.body;

  // Build the partial update query
  const updateFields = [];
  if (task_name) updateFields.push(`task_name = '${task_name}'`);
  if (description) updateFields.push(`description = '${description}'`);

  if (updateFields.length === 0) {
    return res.status(400).json({ error: "No fields to update" });
  }
  console.log(updateFields.join(", "), "pppppp");
  const updateQuery = `UPDATE todos SET ${updateFields.join(
    ", "
  )} WHERE id = ?`;

  database.query(updateQuery, [id], (error, results) => {
    if (error) {
      console.error("Error updating todo:", error);
      return res.status(500).json({ error: "Error updating todo" });
    }

    return res.status(200).json({ message: "Todo updated successfully" });
  });
};

//DELETE SINGLE TODO
exports.deleteSingleTodo = (req, res) => {
  const q = `DELETE FROM todos  WHERE id=${req.params.id}`;

  database.query(q, (err, result) => {
    if (err) return res.json(err);
    return res.status(200).json({ data: "todo deleted" });
  });
};
