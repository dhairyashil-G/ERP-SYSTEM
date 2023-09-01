import "./App.css";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import NavBar from "./components/extras/NavBar.jsx";

import RawProductPage from "./pages/RawProductsPage";
import ProcessingPage from "./pages/ProcessingPage";

import CreateProduct from "./components/processing/CreateProduct";
import CreateNewBatch from "./components/processing/CreateBatch";
import CreateRawProduct from "./components/raw_products/CreateRawProduct"
import ListRawProducts from "./components/raw_products/ListRawProducts";
import EditableTable from "./components/raw_products/UpdateRawProduct";
import ProductList from "./components/processing/ListProducts";


import Login from "./components/accounts/Login";
import Signup from "./components/accounts/SignUp";

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col h-screen">
        <div>
          <NavBar />
        </div>
        <div className="flex-grow justify-center py-10 px-4 mb-auto">
          <div className="w-full space-y-10">
            <Routes>
              <Route path="rawproducts/" element={<RawProductPage/>}/>
              <Route path="processing/" element={<ProcessingPage/>}/>
              <Route path="rawproducts/create" element={<CreateRawProduct/>}/>
              <Route path="rawproducts/list" element={<ListRawProducts/>}/>
              <Route path="rawproducts/update" element={<EditableTable/>}/>
              <Route path="processing/createbatch" element={<CreateNewBatch/>}/>
              <Route path="processing/list" element={<ProductList/>}/>
              <Route path="processing/create" element={<CreateProduct/>}/>

              <Route path="login" element={<Login/>}/>
              <Route path="signup" element={<Signup/>}/>
            </Routes>
              
              
          {/* <Footer /> */}
        </div>
      </div>
      </div>
    </AuthProvider>
    );
}
export default App;