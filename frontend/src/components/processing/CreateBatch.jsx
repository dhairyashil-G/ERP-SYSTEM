import React, { useState } from 'react';
import useAxios from '../../utils/useAxios';
import Heading from '../extras/Heading';


const CreateNewBatch = () => {
  const api=useAxios();
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [batchSheetData, setBatchSheetData] = useState(null);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'productName') {
      setProductName(value);
    } else if (name === 'quantity') {
      setQuantity(value);
    }
  };

  const fetchBatchSheet = async () => {
    try {
      const response = await api.post('http://127.0.0.1:8000/processing/batch-sheet/create/', {
        product_name: productName,quantity: parseInt(quantity,10), pdf: false});
        console.log(response.data)
        setBatchSheetData(response.data);
    } catch (error) {
      console.error('Error fetching batch sheet:', error);
    }
  };

  const handleDownloadPDF = async () => {
      try {
      const response = await api.post('http://127.0.0.1:8000/processing/batch-sheet/create/',
        { product_name: productName,quantity: parseInt(quantity,10), pdf: true },
        { responseType: "blob" });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download",'batchsheet.pdf');   
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
      catch (error) {
        console.error('Error fetching batch sheet:', error);
      }
    };

  return (
    <div className="p-6">
      <Heading heading='Create New Batch'/>
      <div className="mb-4">
        <label className="block font-medium text-gray-700">Product Name</label>
        <input
          type="text"
          name="productName"
          value={productName}
          onChange={handleInputChange}
          className="w-3/12 border rounded py-2 px-3 mt-1 focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium text-gray-700">Quantity (MT)</label>
        <input
          type="number"
          name="quantity"
          value={quantity}
          onChange={handleInputChange}
          className="w-3/12 border rounded py-2 px-3 mt-1 focus:outline-none focus:shadow-outline"
        />
      </div>

  
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={fetchBatchSheet}
      >
        Generate Batch Sheet
      </button>
      {batchSheetData && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Batch Sheet</h2>
          <table className="table-auto w-full">
            <tbody>
              {Object.entries(batchSheetData).map(([key, value]) => (
                <tr key={key}>
                  <td className="font-medium pr-4">{key.replace('_', ' ')}</td>
                  <td>{Array.isArray(value) ? value.join(', ') : value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline"
            onClick={handleDownloadPDF}
          >
            Download PDF
          </button>

          
        </div>
      )}
    </div>
  );
};

export default CreateNewBatch;