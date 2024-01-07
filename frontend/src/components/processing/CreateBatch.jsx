import React, { useState } from 'react';
import useAxios from '../../utils/useAxios';
import Heading from '../extras/Heading';


const CreateNewBatch = () => {
  const api=useAxios();
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [batchSheetData, setBatchSheetData] = useState(null);
  const [c300, setC300]=useState('');
  const [hdisp,setHDISP]=useState('');


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'productName') {
      setProductName(value);
    } else if (name === 'quantity') {
      setQuantity(value);
    }
    else if (name === 'c300'){
      setC300(value);
    }
    else if(name === 'hdisp'){
      setHDISP(value);
    }
  };

  const fetchBatchSheet = async () => {
    try {
      const response = await api.post('http://127.0.0.1:8000/processing/updateproducttable',{'C300_content':c300,'HDISP_content':hdisp}); // Refresh the data after update
    } catch (error) {
      console.error('Error updating raw product:', error);
    }

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
      <div className="flex my-6">
        {/* First Column */}
        <div className="flex-1 mr-4">
          <div className="mb-4">
            <label className="block font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              name="productName"
              value={productName}
              onChange={handleInputChange}
              className="w-full border rounded py-2 px-3 mt-1 focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700">Quantity (Kg)</label>
            <input
              type="number"
              name="quantity"
              value={quantity}
              onChange={handleInputChange}
              className="w-full border rounded py-2 px-3 mt-1 focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>

        {/* Second Column */}
        <div className="flex-1">
          <div className="mb-4">
            <label className="block font-medium text-gray-700">C300 Content (%)</label>
            <input
              type="number"
              name="c300"
              value={c300}
              onChange={handleInputChange}
              className="w-full border rounded py-2 px-3 mt-1 focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700">HDISP Content (%)</label>
            <input
              type="number"
              name="hdisp"
              value={hdisp}
              onChange={handleInputChange}
              className="w-full border rounded py-2 px-3 mt-1 focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
      </div>
        
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={fetchBatchSheet}
      >
        Generate Batch Sheet
      </button>
      <br/>
      <br/>
      <hr/>
      {batchSheetData && (
        <div className="mt-6">
          {/* <h2 className="text-xl font-semibold mb-2">Batch Sheet</h2> */}
          <div className="headings">
            <div className="flex items-center space-x-4 mb-4">
              <h2 className="text-2xl font-semibold">Product Name:</h2>
              <p className="text-2xl">{batchSheetData.product_name}</p>
            </div>

            <div className="flex items-center space-x-4 mb-4">
              <h2 className="text-2xl font-semibold">Quantity:</h2>
              <p className="text-2xl">{batchSheetData.quantity} Kg</p>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-800">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-800 py-2 px-4">Raw Material</th>
                  {/* <th className="border border-gray-800 py-2 px-4">Sequence</th> */}
                  <th className="border border-gray-800 py-2 px-4">Weight</th>
                </tr>
              </thead>
              <tbody>
                {batchSheetData.raw_materials.map((rawMaterial, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                
                    <td className="border border-gray-800 py-2 px-4">{rawMaterial.replace(/\[|\]/g, '')}</td>
                    {/* <td className="border border-gray-800 py-2 px-4">{batchSheetData.sequences[index].replace(/\[|\]/g, '')}</td> */}
                    <td className="border border-gray-800 py-2 px-4">{batchSheetData.weights[index]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-800 mt-6">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-800 py-2 px-4">Expected Table Name</th>
                  <th className="border border-gray-800 py-2 px-4">Expected Table Value</th>
                </tr>
              </thead>
              <tbody>
                {batchSheetData.expected_table_name.map((name, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                    <td className="border border-gray-800 py-2 px-4">{name.replace(/\[|\]/g, '')}</td>
                    <td className="border border-gray-800 py-2 px-4">{batchSheetData.expected_table_values[index]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>          

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