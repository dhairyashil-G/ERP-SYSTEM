import React, { useState } from 'react';

const AddProductForm = () => {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [code, setCode] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'productName':
        setProductName(value);
        break;
      case 'quantity':
        setQuantity(value);
        break;
      case 'code':
        setCode(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform database submission or API call here
    // Use the captured productName, quantity, and code values
    console.log('Product Name:', productName);
    console.log('Quantity:', quantity);
    console.log('Code:', code);

    // Reset form fields
    setProductName('');
    setQuantity('');
    setCode('');
  };

  return (
    <div className="bg-gray-200 p-12 w-6/12 mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Add New Raw Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 w-6/12 mx-auto">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName">
            Product Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="productName"
            type="text"
            name="productName"
            value={productName}
            onChange={handleInputChange}
            placeholder="Enter product name"
          />
        </div>
        <div className="mb-4 w-6/12 mx-auto">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
            Quantity:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="quantity"
            type="number"
            name="quantity"
            value={quantity}
            onChange={handleInputChange}
            placeholder="Enter quantity"
          />
        </div>
        <div className="mb-4 w-6/12 mx-auto">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code">
            Factory Code:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="code"
            type="text"
            name="code"
            value={code}
            onChange={handleInputChange}
            placeholder="Enter alphanumeric code"
          />
        </div>
        <div className="flex items-center mt-12 justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;