import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Heading from '../extras/Heading';


const EditableTable = () => {
  const [rawProducts, setRawProducts] = useState([]);

  useEffect(() => {
    fetchRawProducts();
  }, []);

  const fetchRawProducts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/rawproduct/list/'); // Update the API endpoint
      setRawProducts(response.data);
    } catch (error) {
      console.error('Error fetching raw products:', error);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await axios.put(`http://127.0.0.1:8000/rawproduct/update/${id}/`, updatedData); // Update the API endpoint
      fetchRawProducts(); // Refresh the data after update
    } catch (error) {
      console.error('Error updating raw product:', error);
    }
  };

  const handleCellValueChange = (rowIndex, field, value) => {
    const updatedRawProducts = [...rawProducts];
    updatedRawProducts[rowIndex][field] = value;
    setRawProducts(updatedRawProducts);
  };

  return (
    <>
    <Heading heading='Update Raw Materials'/>
    <div className="p-4">
      <table className="table-auto w-full border-collapse border">
        <thead>
          <tr>
            <th className="px-4 py-2 bg-gray-200">Name</th>
            <th className="px-4 py-2 bg-gray-200">Calcium Content</th>
            <th className="px-4 py-2 bg-gray-200">Magnesium Content</th>
            <th className="px-4 py-2 bg-gray-200">Zinc Content</th>
            <th className="px-4 py-2 bg-gray-200">Nitrogen Content</th>
            <th className="px-4 py-2 bg-gray-200">Moly Content</th>
            <th className="px-4 py-2 bg-gray-200">Quantity</th>
            <th className="px-4 py-2 bg-gray-200">FCode</th>
            <th className="px-4 py-2 bg-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rawProducts.map((product, rowIndex) => (
            <tr key={product.id} className={rowIndex % 2 === 0 ? 'bg-gray-100' : ''}>
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  value={product.calcium_content}
                  onChange={e =>
                    handleCellValueChange(rowIndex, 'calcium_content', e.target.value)
                  }
                  className="w-16 p-1 border rounded"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  value={product.magnesium_content}
                  onChange={e =>
                    handleCellValueChange(rowIndex, 'magnesium_content', e.target.value)
                  }
                  className="w-16 p-1 border rounded"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  value={product.zinc_content}
                  onChange={e =>
                    handleCellValueChange(rowIndex, 'zinc_content', e.target.value)
                  }
                  className="w-16 p-1 border rounded"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  value={product.nitrogen_content}
                  onChange={e =>
                    handleCellValueChange(rowIndex, 'nitrogen_content', e.target.value)
                  }
                  className="w-16 p-1 border rounded"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  value={product.moly_content}
                  onChange={e =>
                    handleCellValueChange(rowIndex, 'moly_content', e.target.value)
                  }
                  className="w-16 p-1 border rounded"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  value={product.quantity}
                  onChange={e =>
                    handleCellValueChange(rowIndex, 'quantity', e.target.value)
                  }
                  className="w-16 p-1 border rounded"
                />
              </td>
              <td className="px-4 py-2">{product.fcode}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleUpdate(product.id, rawProducts[rowIndex])}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default EditableTable;
