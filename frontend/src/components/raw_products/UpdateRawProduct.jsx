import React, { useState, useEffect } from 'react';
import useAxios from '../../utils/useAxios';
import Heading from '../extras/Heading';


const EditableTable = () => {
  const [rawProducts, setRawProducts] = useState([]);

  const api=useAxios();
  useEffect(() => {
    fetchRawProducts();
  }, []);

  const fetchRawProducts = async () => {
    try {
      const response = await api.get('http://127.0.0.1:8000/rawproduct/list/'); // Update the API endpoint
      setRawProducts(response.data);
    } catch (error) {
      console.error('Error fetching raw products:', error);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await api.put(`http://127.0.0.1:8000/rawproduct/update/${id}/`, updatedData); // Update the API endpoint
      fetchRawProducts(); // Refresh the data after update
    } catch (error) {
      console.error('Error updating raw product:', error);
    }
  };

  const updateproducttable = async () => {
    try {
      const response = await api.post('http://127.0.0.1:8000/processing/updateproducttable',{'C300_content':0,'HDISP_content':0}); // Refresh the data after update
    } catch (error) {
      console.error('Error updating raw product:', error);
    }
  };
  

  const handleCellValueChange = (rowIndex, field, value) => {
    const updatedRawProducts = [...rawProducts];
    updatedRawProducts[rowIndex][field] = value;
    console.log(updatedRawProducts)
    setRawProducts(updatedRawProducts);
  };



  return (
    <>
    <Heading heading='Update Raw Materials'/>
    <div className="p-4">
      <table className="table-auto w-full border-collapse border">
        <thead>
          <tr>
            <th className="px-4 py-2 bg-gray-200">FCODE Name</th>
            <th className="px-4 py-2 bg-gray-200">Calcium (%)</th>
            <th className="px-4 py-2 bg-gray-200">Magnesium (%)</th>
            <th className="px-4 py-2 bg-gray-200">Zinc <br /> (%)</th>
            <th className="px-4 py-2 bg-gray-200">Nitrogen (%)</th>
            <th className="px-4 py-2 bg-gray-200">Moly <br /> (%)</th>
            <th className="px-4 py-2 bg-gray-200">TBN <br /> (%)</th>
            <th className="px-4 py-2 bg-gray-200">Phosphorus (%)</th>
            <th className="px-4 py-2 bg-gray-200">Sulfur <br /> (%)</th>
            <th className="px-4 py-2 bg-gray-200">Boron (%)</th>
            <th className="px-4 py-2 bg-gray-200">Quantity (MT)</th>
            <th className="px-4 py-2 bg-gray-200">Price/Kg</th>
            <th className="px-4 py-2 bg-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rawProducts.map((product, rowIndex) => (
            <tr key={product.id} className={rowIndex % 2 === 0 ? 'bg-gray-100' : ''}>
              <td className="px-4 py-2">{product.fcode}</td>
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
                    handleCellValueChange(rowIndex, 'magnesium_content',e.target.value)
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
                  value={product.TBN_content}
                  onChange={e =>
                    handleCellValueChange(rowIndex, 'TBN_content', e.target.value)
                  }
                  className="w-16 p-1 border rounded"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  value={product.phosphorus_content}
                  onChange={e =>
                    handleCellValueChange(rowIndex, 'phosphorus_content', e.target.value)
                  }
                  className="w-16 p-1 border rounded"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  value={product.sulfur_content}
                  onChange={e =>
                    handleCellValueChange(rowIndex, 'sulfur_content', e.target.value)
                  }
                  className="w-16 p-1 border rounded"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  value={product.boron_content}
                  onChange={e =>
                    handleCellValueChange(rowIndex, 'boron_content', e.target.value)
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
              <td className="px-4 py-2">
                <input
                  type="number"
                  value={product.price}
                  onChange={e =>
                    handleCellValueChange(rowIndex, 'price', (e.target.value))
                  }
                  className="w-16 p-1 border rounded"
                />
              </td>
              
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

    <div className='mx-auto text-center'>
      <button onClick={updateproducttable}
        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
      >Update Products Table</button>
    </div>
    </>
  );
};

export default EditableTable;





