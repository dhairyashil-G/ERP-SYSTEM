import "./App.css";
import "./index.css";
import { Routes, Route, Router } from "react-router-dom";
import NavBar from "./components/extras/NavBar.jsx";
import CreateRawProduct from "./components/raw_products/CreateRawProduct"

function App() {
  return (
      <div className="flex flex-col h-screen">
        <div>
          <NavBar />
        </div>
        <div className="flex-grow justify-center py-10 px-4 mb-auto">
          <div className="w-full space-y-10">
            <Routes>
              <Route path="rawproducts/create" element={<CreateRawProduct/>}/>
            </Routes>
              
              
          {/* <Footer /> */}
        </div>
      </div>
      </div>
    );
}
export default App;