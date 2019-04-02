const Note = require('../models/Note');

exports.getNotes = async (req, res) => {
	const notes = await Note.find().sort({ date: -1 });
	res.json(notes);
};

exports.addNote = async (req, res) => {
	const note = await new Note(req.body).save();
	res.json(note);
};

exports.deleteNote = async (req, res) => {
	await Note.findByIdAndDelete(req.params.id);
	res.json({ success: true });
};

exports.updateNote = async (req, res) => {
	const note = await Note.findOneAndUpdate({ _id: req.params.id }, req.body, {
		new: true,
		runValidators: true
	});
	res.json(note);
};
