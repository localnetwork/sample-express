const express = require("express");
const app = express();
app.use(express.json());

const employees = [
  {
    id: 1,
    name: "John Piechnick",
  },
  {
    id: 2,
    name: "Wilson Solamo",
  },
  {
    id: 3,
    name: "Gerald Sayson",
  },
  {
    id: 4,
    name: "Genesis Tagsip",
  },
  {
    id: 5,
    name: "Vince Quinaging",
  },
];

app.get("/", (req, res) => {
  return res.json("Hello World");
});

// All Employees ROUTE
app.get("/employees", (req, res) => {
  if (employees.length === 0) {
    return res.status(404).json("No employees found");
  }
  return res.json(employees);
});

app.post("/employees", (req, res) => {
  const employee = {
    id: employees.length + 1,
    name: req.body.name,
  };
  employees.push(employee);
  return res.json({
    message: "Employee added successfully",
    data: employee,
  });
});

// Individual GET ROUTE
app.get("/employees/:id", (req, res) => {
  const foundEmployee = employees.find(
    (employee) => employee.id === parseInt(req.params.id)
  );

  if (!foundEmployee) return res.status(404).json("Employee not found");
  return res.json(
    employees.find((employee) => employee.id === parseInt(req.params.id))
  );
});

// Update ROUTE
app.put("/employees/:id", (req, res) => {
  const employee = employees.find(
    (employee) => employee.id === parseInt(req.params.id)
  );
  if (!employee) return res.status(404).json("Employee not found");
  employee.name = req.body.name;
  return res.json({
    message: "Employee updated successfully",
    data: employee,
  });
});

// Delete ROUTE
app.delete("/employees/:id", (req, res) => {
  const employee = employees.find(
    (employee) => employee.id === parseInt(req.params.id)
  );
  if (!employee) return res.status(404).json("Employee not found");
  const index = employees.indexOf(employee);
  employees.splice(index, 1);

  return res.status(200).json({
    message: "Employee deleted successfully",
  });
});

app.listen(2000, () => {
  console.log("Connected to http://localhost:2000");
});
