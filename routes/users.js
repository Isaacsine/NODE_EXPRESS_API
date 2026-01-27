import express from 'express';
import { readUsers, writeUsers } from '../dataStore.js';

const router = express.Router();

// GET all users
router.get('/', async (req, res) => {
  const users = await readUsers();
  res.status(200).json(users);
});

// CREATE user
router.post('/', async (req, res) => {
  const users = await readUsers();
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  await writeUsers(users);
  res.status(201).json({ message: 'User created successfully', user: newUser });
});

// GET user by ID
router.get('/:id', async (req, res) => {
  const users = await readUsers();
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.status(200).json(user);
});

// UPDATE user
router.put('/:id', async (req, res) => {
  const users = await readUsers();
  const id = parseInt(req.params.id);
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return res.status(404).json({ message: 'User not found' });
  const updated = { id, ...req.body };
  users[idx] = updated;
  await writeUsers(users);
  res.status(200).json({ message: 'User updated successfully', user: updated });
});

// DELETE user
router.delete('/:id', async (req, res) => {
  const users = await readUsers();
  const id = parseInt(req.params.id);
  const filtered = users.filter((u) => u.id !== id);
  if (filtered.length === users.length) return res.status(404).json({ message: 'User not found' });
  await writeUsers(filtered);
  res.status(200).json({ message: 'User deleted successfully' });
});

export default router;