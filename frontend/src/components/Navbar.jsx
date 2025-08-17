// Import Link component for client-side navigation (no page reload)
import{Link} from "react-router";
// Import Plus icon from Lucide React icon library
import{PlusIcon} from "lucide-react";


const Navbar=()=>{
    return(
        // Main header container with background color and bottom border
        <header className="bg-base-300 border-b border-base-content/10">
            {/* Content wrapper with max width and padding */}
            <div className="mx-auto max-w-7xl p-4"> 
                {/* Flex container to space items between left and right */}
                <div className="flex items-center justify-between">
                    {/* App title/logo on the left side */}
                    <h1 className="text-3xl font-bold text-primary font-mono tracking-tight" >Thinkboard</h1>
                    {/* Right side navigation items */}
                    <div className="flex items-center gap-4">
                        
                        {/* Link to create new note page with button styling */}
                        <Link to={"/create"} className="btn btn-primary ">
                            {/* Plus icon with fixed size */}
                            <PlusIcon className="size-5"></PlusIcon>    
                            {/* Button text */}
                            <span>New Note</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar;