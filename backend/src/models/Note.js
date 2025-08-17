import mongoose from "mongoose";   //Mongoose library makes it easier to work with MongoDB by providing structure and validation

// Purpose of this file:
// Defines what a "note" looks like in your database(title, content)
// Enforces rules: Both title and content are required - MongoDB will reject incomplete notes
// Consistent format: Every note will have the same structure
// 2. Database Interface - Bridge between your app and MongoDB: Your controllers use this model to interact with the database

// 3. Enforces validation rules (both fields required)
// 4. Creates interface for database operations (CRUD)
// 5. Adds automatic timestamps (createdAt, updatedAt)

// This file will be used in controller.js (To )


// 1- create  a scheme
//2- model based of that schema   

// 1- 

const noteSchema = new mongoose.Schema({
        title:{
            type: String,
            required: true, //required - must be provided when creating a note
        },
        content:{
              type: String,
            required: true, //required - must be provided when creating a note
        },
    },
    {timestamps : true} //Automatically adds two fields: Created at ,updated at
 );

 // 2- 
 const Note = mongoose.model("Note",noteSchema);
 export default Note;