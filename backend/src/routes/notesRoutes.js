import express from "express";
import {createNote, getNoteByid, deleteNote,getAllNotes, updateNote } from "../controllers/notesController.js";
const router = express.Router();

//What is an endpoint 
// An endpoint is  a combination of URL plus http method 
// that lets the client interact with a specific resource 
 
router.get("/", getAllNotes);
router.get("/:id", getNoteByid);
// The "/" here is relative to the path you set in app.use.
// So, when you visit:
// GET /api/notes → matches router.get("/")
// POST /api/notes → matches router.post("/")
// PUT /api/notes/123 → matches router.put("/:id") (id = 123)
// DELETE /api/notes/123 → matches router.delete("/:id") (id = 123)
router.post("/",createNote);
//put,delete requires updation into an  existing node with id on database as seen balow
router.put("/:id", updateNote);
router.delete("/:id",deleteNote);

export default router; 