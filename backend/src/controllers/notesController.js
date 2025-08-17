import Note from "../models/Note.js";

export async function getAllNotes(req,res){
    try{
        const notes= await Note.find().sort({createdAt: -1});//sort({createdAt: -1})-  newest first    sort({createdAt: 1})- Oldest first
        res.status(200).json(notes);
    }
    catch(error){
        console.error("Error In getAllNotes controller",error);
        res.status(500).json({message:"INternal Server Error "});
     }
} 
export async function  getNoteByid(req,res){
    try{
        const note =  await Note.findById(req.params.id);
        if(!note) return res.status(404).json({message:"Note not found"});
        res.json(note);
    }catch(error){
        console.error("Error in getting all notes controller",error);
        res.status(500).json({message:"internal server erroe"});
    }
}

export async  function createNote(req,res){
    //post
    try{

//         Always save first, respond second because:
// We want to know if the operation actually succeeded
// The client should only get a success message if the data is truly saved
// Error handling works properly this way

         // Extract data from request body
        const { title, content } = req.body; 
        // Create new note instance in memory (NOT saved to DB yet)
        const note = new Note({ title,content });

        // Save to MongoDB (this is where the actual database write happens)
      const savedNote=await note.save();

      // Only after successful save, send success response along with note itself
       res.status(201).json(savedNote);
        
    }
    catch(error){
        console.error("Error In createNote controller",error);
        res.status(500).json({message:"🙇‍♂️ Internal server error"});
     }
} 
export async function updateNote(req,res){
    //put
    try{
        const {title,content} = req.body;
        
        // Note.findByIdAndUpdate() - Mongoose method that finds document by ID and updates it
        // Parameter 1: req.params.id - MongoDB ObjectId from URL (e.g., /api/notes/507f1f77bcf86cd799439011)
        // Parameter 2: {title,content} - Update object with new values from request body
        // Parameter 3: {new: true} - Returns updated document instead of original
        // Process: 1) Find note with matching ID, 2) Replace title & content fields, 3) Save to database
        // MongoDB equivalent: db.notes.updateOne({_id: ObjectId}, {$set: {title, content}})
        
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            {title,content},
            {
                new:true,
            }
        );
        
        // If no note found with that ID (valid ID format but doesn't exist)
        if(!updatedNote) return res.status(404).json({message:"🚫 Note not found"});
        res.status(200).json({message:"✅ Note updated successfully", note: updatedNote});
    }
    catch(error){
        console.error("Error In updateNote controller",error);
        
        // For other errors (database connection, etc.)
        res.status(500).json({message:"🙇‍♂️ Internal server error"});
    }
} 

export async function deleteNote(req,res){
    //delete
    try{
        const deletedNote= await Note.findByIdAndDelete(req.params.id)
            if(!deletedNote){
                return res.status(404).json({message:"Note not found"});
            }
            res.json({message:" Note delete successfully"});
        }
    
    catch(error){
      console.error("Error In updateNote controller",error);
        
        // For other errors (database connection, etc.)
        res.status(500).json({message:"🙇‍♂️ Internal server error"}); 
    }
   
} 