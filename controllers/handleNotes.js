const Note = require("../models/Note");
const getAllNotes = async (req, res) => {
    try {
        const userId = req.user?._id || null;
        if (!userId) {
            return res.status(401).json({ message: "You are not authorized to view the notes!" });
        }
        let notes;
        if (req.user.role === "admin") {
            const targetUserId = req.query.id;
            if (!targetUserId) {
                return res.status(400).json({ message: "User ID is required." });
            }
            notes = await Note.find({ user: targetUserId });
        } else {
            notes = await Note.find({ user: userId });
        }

        if (!notes.length) {
            return res.status(404).json({ message: "No notes found!" });
        }

        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const getNote = async (req, res) => {
    try {
        const userId = req.user?._id || null;
        if(!userId){
            return res.status(401).json({message:"You are not authorized to view the notes!"});
        }
        const note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).json({message:"Note not found!"});
        }
        if(note.user.toString() !== req.user._id.toString() && req.user.role !== "admin"){
            return res.status(401).json({message:"You are not authorized to view this note!"});
        }
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createNote = async (req, res) => {
    try {
        if(!req.body.title || !req.body.content){
            return res.status(400).json({message:"Please provide title and content!"});
        }
        const note = await Note.create({...req.body, user: req.user._id});
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).json({message:"Note not found!"});
        }
        if(note.user.toString() !== req.user._id.toString() && req.user.role !== "admin"){
            return res.status(401).json({message:"You are not authorized to update this note!"});
        }
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).json({message:"Note not found!"});
        }
        if(note.user.toString() !== req.user._id.toString() && req.user.role !== "admin"){
            return res.status(401).json({message:"You are not authorized to delete this note!"});
        }
        await Note.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Note deleted successfully!"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote
}