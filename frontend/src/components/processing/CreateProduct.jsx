import React, { useState } from 'react';

const RawProductInput = () => {
  const [rawProducts, setRawProducts] = useState([]);
  const [sequenceInputs, setSequenceInputs] = useState({});

  const handleRawProductChange = (rawProductName) => {
    const newRawProducts = [...rawProducts];
    const index = newRawProducts.indexOf(rawProductName);

    if (index === -1) {
      newRawProducts.push(rawProductName);
    } else {
      newRawProducts.splice(index, 1);
    }

    setRawProducts(newRawProducts);
  };

  const handleSequenceChange = (rawProductName, sequence) => {
    setSequenceInputs((prevInputs) => ({
      ...prevInputs,
      [rawProductName]: sequence,
    }));
  };

  return (
    <div>
      <h2>Add Raw Product with Sequence</h2>
      {rawProducts.map((rawProductName) => (
        <div key={rawProductName}>
          <label>
            <input
              type="checkbox"
              checked={rawProducts.includes(rawProductName)}
              onChange={() => handleRawProductChange(rawProductName)}
            />
            {rawProductName}
          </label>
          <input
            type="number"
            value={sequenceInputs[rawProductName] || ''}
            onChange={(e) => handleSequenceChange(rawProductName, e.target.value)}
            placeholder="Sequence"
          />
        </div>
      ))}
      <h3>Selected Raw Products with Sequences</h3>
      <ul>
        {rawProducts.map((rawProductName) => (
          <li key={rawProductName}>
            <strong>Raw Product Name:</strong> {rawProductName}
            <br />
            <strong>Sequence:</strong> {sequenceInputs[rawProductName] || 'N/A'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RawProductInput;
