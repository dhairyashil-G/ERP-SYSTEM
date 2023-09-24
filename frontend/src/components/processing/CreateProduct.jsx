import React, { useEffect, useState } from 'react';
import useAxios from "../../utils/useAxios";
import Heading from "../extras/Heading";

const RawProductInput = () => {
  const api = useAxios();
  const [productName, setProductName] = useState('');
  const [rawProducts, setRawProducts] = useState([]);
  const [checkboxValues, setCheckboxValues] = useState({});
  const [sequenceInputs, setSequenceInputs] = useState({});
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [calciumContent, setCalciumContent] = useState('');
  const [magnesiumContent, setMagnesiumContent] = useState('');
  const [zincContent, setZincContent] = useState('');
  const [nitrogenContent, setNitrogenContent] = useState('');
  const [molyContent, setMolyContent] = useState('');
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
      default:
          break;
      }
    };
  const getRawProducts = async () => {
    try {
      const response = await api.get(`/rawproduct/list`);
      const initialCheckboxValues = {};
      const initialSequenceInputs = {};

      response.data.forEach(rawProduct => {
        initialCheckboxValues[rawProduct.id] = false;
        initialSequenceInputs[rawProduct.id] = '';
      });

      setCheckboxValues(initialCheckboxValues);
      setSequenceInputs(initialSequenceInputs);
      setRawProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRawProducts();
  }, []);

  const handleCheckboxChange = (event, rawProduct) => {
    const { checked } = event.target;
    setCheckboxValues(prevValues => ({
      ...prevValues,
      [rawProduct.id]: checked
    }));
  };

  const handleSequenceChange = (event, rawProduct) => {
    const { value } = event.target;
    setSequenceInputs(prevInputs => ({
      ...prevInputs,
      [rawProduct.id]: value
    }));
  };

  const handleAddProduct =async (e) => {
    const selected = [];
    for (const productId in checkboxValues) {
      if (checkboxValues[productId]) {
        const rawProduct = rawProducts.find(product => product.id === parseInt(productId));
        if (rawProduct) {
          selected.push({ ...rawProduct, sequence: parseInt(sequenceInputs[productId]) });
        }
      }
    }
    setSelectedProducts(selected);
    const RawproductNames = selected.map(product => product.name);
    const RawproductSequences = selected.map(product => product.sequence);
    e.preventDefault();

    try {
      const response = await api.post('http://127.0.0.1:8000/processing/create/', {
        name: productName,
        raw_materials: `[${RawproductNames.join(', ')}]`,
        weights:"[ ]",
        sequences : `[${RawproductSequences.join(', ')}]`,
        raw_materials_percentage: "[ ]"
      });

      // Handle success or show a message to the user
      console.log('Data saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving data:', error);
    }
    try {
      const response = await api.post('http://127.0.0.1:8000/processing/updateproductspecs', {
        name: productName,
        calcium_content :calciumContent,
        magnesium_content: magnesiumContent,
        zinc_content: zincContent,
        nitrogen_content: nitrogenContent,
        moly_content: molyContent,
        TBN_content: TBNContent,
        phosphorus_content: phosphorusContent,
        sulfur_content: sulfurContent,
        boron_content: boronContent
      });

      // Handle success or show a message to the user
      console.log('Data saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleNameChange = (e) =>{
    setProductName(e.target.value);
  }

  return (
    <div>
      <Heading heading={'Create Product'} />
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
            onChange={handleNameChange}
            placeholder="Enter product name"
          />
        </div>
      <div className="overflow-x-auto my-8">
        <table className="min-w-full bg-white rounded-xl">
          {/* <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4">Raw Product</th>
              <th className="py-2 px-4">Sequence</th>
            </tr>
          </thead> */}
          <tbody>
            {rawProducts.map(rawProduct => (
              <tr key={rawProduct.id} className={rawProduct.id % 2 === 0 ? 'bg-gray-200' : 'bg-white'}>
                <td className="py-2 px-4">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name={`rawProduct_${rawProduct.id}`}
                      checked={checkboxValues[rawProduct.id]}
                      onChange={event => handleCheckboxChange(event, rawProduct)}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2">{rawProduct.name}</span>
                  </label>
                </td>
                <td className="py-2 px-4">
                  <input
                    type="number"
                    name={`sequence_${rawProduct.id}`}
                    value={sequenceInputs[rawProduct.id]}
                    onChange={event => handleSequenceChange(event, rawProduct)}
                    placeholder="Sequence"
                    className="w-6/12 p-1 border rounded-md focus:ring focus:ring-blue-300"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="my-3 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="calcium_content">
              Calcium Content:
          </label>
            <input
              className="shadow appearance-none border rounded w-8/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="calcium_content"
              type="number"
              name="calciumContent"
              value={calciumContent}
              onChange={handleInputChange}
              placeholder="Enter calcium content"
            />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
              Magnesium Content:
          </label>
            <input
              className="shadow appearance-none border rounded w-8/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="magnesiumContent"
              type="number"
              name="magnesiumContent"
              value={magnesiumContent}
              onChange={handleInputChange}
              placeholder="Enter Magnesium content"
              />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="zinc_content">
              Zinc Content:
            </label>
            <input
              className="shadow appearance-none border rounded w-8/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="zinc_content"
              type="number"
              name="zincContent"
              value={zincContent}
              onChange={handleInputChange}
              placeholder="Enter zinc content"
              />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nitrogen_content">
              Nitrogen Content:
            </label>
            <input
              className="shadow appearance-none border rounded w-8/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nitrogen_content"
              type="number"
              name="nitrogenContent"
              value={nitrogenContent}
              onChange={handleInputChange}
              placeholder="Enter nitrogen content"
              />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="moly_content">
              Moly Content:
            </label>
            <input
              className="shadow appearance-none border rounded w-8/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="moly_content"
              type="number"
              name="molyContent"
              value={molyContent}
              onChange={handleInputChange}
              placeholder="Enter moly content"
              />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fcode">
              TBN:
            </label>
            <input
              className="shadow appearance-none border rounded w-8/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="TBN_content"
              type="number"
              name="TBNContent"
              value={TBNContent}
              onChange={handleInputChange}
              placeholder="Enter TBN content"
              />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fcode">
              Phosphorus:
            </label>
            <input
              className="shadow appearance-none border rounded w-8/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phosphorus_content"
              type="number"
              name="phosphorusContent"
              value={phosphorusContent}
              onChange={handleInputChange}
              placeholder="Enter phosphorus content"
              />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fcode">
              Sulfur:
            </label>
            <input
              className="shadow appearance-none border rounded w-8/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="sulfur_content"
              type="number"
              name="sulfurContent"
              value={sulfurContent}
              onChange={handleInputChange}
              placeholder="Enter sulfur content"
            />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fcode">
            Boron:
          </label>
          <input
            className="shadow appearance-none border rounded w-8/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="boron_content"
            type="number"
            name="boronContent"
            value={boronContent}
            onChange={handleInputChange}
            placeholder="Enter boron content"
            />
        </div>
      </div>
            
      <div className='mx-auto text-center'>
        <button
          onClick={handleAddProduct}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Product
        </button>
      </div>

      {selectedProducts.length > 0 && (
        <div>
          <h2 className="mt-4 text-lg font-semibold">Selected Products:</h2>
          <h3>{productName}</h3>
          <ul>
            {selectedProducts.map(product => (
              <li key={product.id}>
                {product.name} - Sequence: {product.sequence}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RawProductInput;