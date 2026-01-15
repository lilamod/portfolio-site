const Note = require("../models/note.model");

const createNote = async (req, res) => {
  try {
     await Note.create({ ...req.body, user: req.user.id });
    res.status(201).json({message: "Note is created successfully"});
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

const getNotes = async (req, res) => {
  try {
    const search = req.query.search || "";
  const notes = await Note.find({
    user: req.user.id,
    $or: [
      { title: new RegExp(search, "i") },
      { text: new RegExp(search, "i") },
    ],
  }).sort({ pinned: -1, createdAt: -1 });

  res.json(notes);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};


const updateNote = async (req, res) => {
  try {
    const note = await Note.findById({_id: req.params.id, user: req.user._id});

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    await Note.findByIdAndUpdate(req.params.id, req.body);

    return res.status(200).json({message:"Note updated successfully"});
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById({_id: req.params.id, user: req.user._id});

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    await Note.findByIdAndUpdate(req.params.id);

    res.status(200).json({message: "Note deleted"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const getNote = async(req, res, next) =>{
  const note = await Note.findById({_id: req.params.id, user: req.user._id});

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    return res.status(200).json(note)
}

module.exports ={
    createNote,
    updateNote,
    getNotes,
    deleteNote,
    getNote
}