import Heading from '../extras/Heading';
import React, { useState } from 'react';
import useAxios from '../../utils/useAxios';

const AddProductForm = () => {
  const api=useAxios();
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [calciumContent, setCalciumContent] = useState('');
  const [magnesiumContent, setMagnesiumContent] = useState('');
  const [zincContent, setZincContent] = useState('');
  const [nitrogenContent, setNitrogenContent] = useState('');
  const [molyContent, setMolyContent] = useState('');
  const [fcode, setFcode] = useState('');
  const [TBNContent, setTBNContent] = useState('');
  const [sulfurContent, setSulfurContent] = useState('');
  const [phosphorusContent, setPhosphorusContent] = useState('');
  const [boronContent, setBoronContent] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'productName':
        setProductName(value);
        break;
      case 'quantity':
        setQuantity(value);
        break;
      case 'calciumContent':
        setCalciumContent(value);
        break;
      case 'magnesiumContent':
        setMagnesiumContent(value);
        break;
      case 'zincContent':
        setZincContent(value);
        break;
      case 'nitrogenContent':
        setNitrogenContent(value);
        break;
      case 'molyContent':
        setMolyContent(value);
        break;
      case 'TBNContent':
        setTBNContent(value);
        break;
      case 'phosphorusContent':
        setPhosphorusContent(value);
        break;
      case 'sulfurContent':
        setSulfurContent(value);
        break;
      case 'boronContent':
        setBoronContent(value);
        break;
      case 'fcode':
        setFcode(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('http://127.0.0.1:8000/rawproduct/create/', {
        name: productName,
        quantity: parseInt(quantity, 10),
        calcium_content: parseFloat(calciumContent),
        magnesium_content: parseFloat(magnesiumContent),
        zinc_content: parseFloat(zincContent),
        nitrogen_content: parseFloat(nitrogenContent),
        moly_content: parseFloat(molyContent),
        TBN_content: parseFloat(TBNContent),
        phosphorus_content: parseFloat(phosphorusContent),
        sulfur_content: parseFloat(sulfurContent),
        boron_content: parseFloat(boronContent),
        fcode: fcode
      });

      // Handle success or show a message to the user
      console.log('Data saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving data:', error);
    }

    // Reset form fields
    setProductName('');
    setQuantity('');
    setCalciumContent('');
    setMagnesiumContent('');
    setZincContent('');
    setNitrogenContent('');
    setMolyContent('');
    setTBNContent('');
    setPhosphorusContent('');
    setSulfurContent('');
    setBoronContent('');
    setFcode('');
  };

  return (
    <>
    <Heading heading='Create Raw Product'/>
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="calcium_content">
            Calcium Content:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="calcium_content"
            type="number"
            name="calciumContent"
            value={calciumContent}
            onChange={handleInputChange}
            placeholder="Enter calcium content"
          />
        </div>
        <div className="mb-4 w-6/12 mx-auto">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Magnesium Content:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="magnesiumContent"
            type="number"
            name="magnesiumContent"
            value={magnesiumContent}
            onChange={handleInputChange}
            placeholder="Enter Magnesium content"
          />
        </div>
        <div className="mb-4 w-6/12 mx-auto">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="zinc_content">
            Zinc Content:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="zinc_content"
            type="number"
            name="zincContent"
            value={zincContent}
            onChange={handleInputChange}
            placeholder="Enter zinc content"
          />
        </div>
        <div className="mb-4 w-6/12 mx-auto">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nitrogen_content">
            Nitrogen Content:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="nitrogen_content"
            type="number"
            name="nitrogenContent"
            value={nitrogenContent}
            onChange={handleInputChange}
            placeholder="Enter nitrogen content"
          />
        </div>
        <div className="mb-4 w-6/12 mx-auto">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="moly_content">
            Moly Content:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="moly_content"
            type="number"
            name="molyContent"
            value={molyContent}
            onChange={handleInputChange}
            placeholder="Enter moly content"
          />
        </div>
        <div className="mb-4 w-6/12 mx-auto">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fcode">
            TBN:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="TBN_content"
            type="number"
            name="TBNContent"
            value={TBNContent}
            onChange={handleInputChange}
            placeholder="Enter TBN content"
          />
        </div>
        <div className="mb-4 w-6/12 mx-auto">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fcode">
            Phosphorus:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phosphorus_content"
            type="number"
            name="phosphorusContent"
            value={phosphorusContent}
            onChange={handleInputChange}
            placeholder="Enter phosphorus content"
          />
        </div>
        <div className="mb-4 w-6/12 mx-auto">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fcode">
            Sulfur:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="sulfur_content"
            type="number"
            name="sulfurContent"
            value={sulfurContent}
            onChange={handleInputChange}
            placeholder="Enter sulfur content"
          />
        </div>
        <div className="mb-4 w-6/12 mx-auto">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fcode">
            Boron:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="boron_content"
            type="number"
            name="boronContent"
            value={boronContent}
            onChange={handleInputChange}
            placeholder="Enter boron content"
          />
        </div>
        <div className="mb-4 w-6/12 mx-auto">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fcode">
            Fcode:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="fcode"
            type="text"
            name="fcode"
            value={fcode}
            onChange={handleInputChange}
            placeholder="Enter Fcode name"
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
  </>
  );
};

export default AddProductForm;