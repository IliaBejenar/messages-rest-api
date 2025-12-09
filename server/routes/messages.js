const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// GET all messages
router.get('/', async (req, res) => {
  const messages = await Message.find().sort({ createdAt: 1 });
  res.json(messages);
});

// POST new message
router.post('/', async (req, res) => {
  const { name, text } = req.body;

  if (!name || !text) {
    return res.status(400).json({ message: 'Name and text are required' });
  }

  const message = await Message.create({ name, text });
  res.status(201).json(message);
});

// DELETE message
router.delete('/:id', async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// UPDATE message
router.put('/:id', async (req, res) => {
  const { text } = req.body;

  const updated = await Message.findByIdAndUpdate(
    req.params.id,
    { text },
    { new: true }
  );

  res.json(updated);
});

module.exports = router;
