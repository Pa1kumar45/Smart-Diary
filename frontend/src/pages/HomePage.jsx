import { useEffect, useState } from "react"; // React hooks for state and side effects
import Navbar from "../components/Navbar"; // Navigation bar component
import RateLimitedUI from "../components/RateLimitedUI"; // Rate limit warning component
import NoteCard from "../components/NoteCard"; // Note card component
import toast from "react-hot-toast"; // Toast notification library
import api from "../lib/axios";
import NotesNotFound from "../components/NotesNotFound";

const HomePage=()=>{
     const [isRateLimited, setIsRateLimited]= useState(false); // State for rate limit status
     const [notes,setNotes] =useState([]);         // State for storing notes array  
     const [loading, setLoading]=useState(true);   // State for loading indicator
     useEffect(()=>{                               // Hook that runs on component mount
          const fetchNotes=async()=>{              
               try{                
                    const res = await api.get("/notes"); // API call to backend
                    console.log(res.data); 
                    setNotes(res.data); 
                    setIsRateLimited(false);                                        // Clear rate limit flag on success
               }
               catch(error){ // Catch API errors
                    console.log("Error fetching notes:", error);
                    if(error.response?.status === 429){
                         console.log("Rate limit hit - showing rate limit UI");
                         setIsRateLimited(true);                                   // Show rate limit UI
                         toast.error("Too many requests! Please wait a moment.");
                    }
                    else{ 
                         toast.error("Failed to load notes. Please check if backend is running.");                      // Show generic error toast
                    }
               }
               finally{                  // Always runs after try/catch
                    setLoading(false);   // Stop loading spinner
               }
          };
          fetchNotes(); // Call the function
     },[]) // Empty dependency array - runs once on mount
    
     return( 
        <div className="min-h-screen"> 
   <Navbar />                          {/* Render navigation bar */}
   {isRateLimited && <RateLimitedUI/>} {/* Show rate limit UI if needed */}
   
   <div className="max-w-7xl mx-auto p-4 mt-6">
     {loading && <div className="text-center text-primary py-10">Loading Notes...</div>}
     
     {notes.length===0  && !isRateLimited && <NotesNotFound/>}
     { !isRateLimited && notes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {notes.map((note)=>(
                    <NoteCard key={note._id} note={note} setNotes={setNotes}/>
               ))}
          </div>
     )}
   </div>
    </div>
     )
};

export default HomePage; 

