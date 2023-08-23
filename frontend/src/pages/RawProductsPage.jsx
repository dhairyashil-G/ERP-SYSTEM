import React from "react";
import Heading from "../components/extras/Heading"; 
import { Link } from "react-router-dom";

// RawProductPage.js
function RawProductPage() {
  return (
    <div>
      <Heading heading='Raw Product Page'></Heading>
      <div>
        <Link to="/rawproducts/list">
          <button className="mx-4 my-3 w-2/12 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            List Raw Products
          </button>
        </Link>
      </div>
      <div>
        <Link to="/rawproducts/create">
          <button className="mx-4 my-3 w-2/12 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Create Raw Product
          </button>
        </Link>
      </div>
      <div>
        <Link to="/rawproducts/update">
          <button className="mx-4 my-3 w-2/12 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Update Raw Products
          </button>
        </Link>
      </div>
    </div>
  );
}

export default RawProductPage;
