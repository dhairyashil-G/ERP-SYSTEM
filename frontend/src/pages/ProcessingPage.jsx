import React from "react";
import Heading from "../components/extras/Heading"; 
import { Link } from "react-router-dom";

// RawProductPage.js
function ProcessingPage() {
  return (
    <div>
      <Heading heading='Processing Page'></Heading>
      <div>
        <Link to="/processing/list">
          <button className="mx-4 my-3 w-2/12 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            List  Products
          </button>
        </Link>
      </div>
      <div>
        <Link to="/processing/create">
          <button className="mx-4 my-3 w-2/12 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Create New Product
          </button>
        </Link>
      </div>
      <div>
        <Link to="/processing/createbatch">
          <button className="mx-4 my-3 w-2/12 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Create New Batch
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ProcessingPage;
