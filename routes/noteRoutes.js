const express = require('express');
const router = express.Router();

const noteController = require('../controller/noteController');

router.get('/notes', noteController.getNotes);
router.post('/notes', noteController.addNote);
router.delete('/notes/:id', noteController.deleteNote);
router.post('/notes/:id', noteController.updateNote);

module.exports = router;
