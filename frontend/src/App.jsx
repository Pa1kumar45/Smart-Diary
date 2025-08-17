import {Route,Routes} from 'react-router'
import CreatePage from './pages/CreatePage'
import HomePage from './pages/HomePage'
import NoteDetailPage from './pages/NoteDetailPage'


const App = () => {
  return (
    <div className="relative h-full w-full">
 
<div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
 {/* <span className="loading loading-infinity loading-xs"></span>
<span className="loading loading-infinity loading-sm"></span>
<span className="loading loading-infinity loading-md"></span> 
<span className="loading loading-infinity loading-lg"></span> */}

        <Routes>
          <Route path="/" element={<HomePage/> }/>
           <Route path="/create" element={<CreatePage/> }/>
            <Route path="/note/:id" element={<NoteDetailPage/> }/>
             
        </Routes>
     
    </div>
  )
}

export default App