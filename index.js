import express from 'express';
import usersRoutes from './routes/users.js';
import fs from 'fs';

const app = express();
const PORT = 5000;

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.static('frontend_dev'));

app.use('/users', usersRoutes);

let users = [];
try {
  const data = fs.readFileSync('user.json', 'utf8');
  const userData = JSON.parse(data);
  users = [{ id: 1, ...userData }];
} catch (err) {
  console.error('Error reading user.json:', err);
  users = [
    {
      id: 1,
      firstName: "Sinethemba",
      lastName: "Nkosi",
      age: 24
    },
  ];
}

app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'something went wrong' });
});
 
app.get('/users', (_req, res, next) => {
  try{
      res.json(users);
  } catch (err){
    next(err);
  }
});

app.post("/users",(req, res, next) => {
  try{
  const user = { id: users.length + 1, ...req.body };
  users.push(user);
  res.json({message: "successfully created user", user, users});
  } catch (err){
    next(err);
  }
 });

app.get("/users/:id", (req, res, next) => {
  try{ 
    const id = parseInt(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
    } catch (err){
    next(err);
  }
    });

app.delete("/users/:id", (req, res, next) => {
  try{
    const id = parseInt(req.params.id);
    users = users.filter((user) => user.id !== id);
    res.json({ message: "User deleted", users });
    } catch (err){
    next(err);
  }
});

app.put("/users/:id", (req, res, next) => {
  try{
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }
    const updatedUser = { id, ...req.body };
    users[userIndex] = updatedUser;
    res.json({message: "User updated successfully", user: updatedUser, users});
    } catch (err){
    next(err);
  }
});

app.get("/trigger-error", (_req, _res, next) => {
  try{
    throw new Error("This is a custom error");
  }catch(error){
    next(error)
  }
  });

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
