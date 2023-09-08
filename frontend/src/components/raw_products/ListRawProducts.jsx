import Heading from "../extras/Heading";
import { useEffect,useState } from "react";
import Table from "../extras/Table";
import { useMemo } from "react";
import axios from "axios";

function ListRawProducts() {
    const [rawproducts, setRawProducts] = useState([]);
    
    const getdata = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/rawproduct/list/`);
        //   console.log(JSON.parse(response.data.bar_fig));
          console.log(response.data);
        //   console.log(JSON.parse(response.data.pie_fig));
        //   console.log(JSON.parse(response.data.df));
        setRawProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
        getdata();
      }, []);
    
    
      const table_data = useMemo(
        () => [...rawproducts],
        [rawproducts]
      );
    
      const columns_table = useMemo(
        () => [
          {
            Header: "Name",
            accessor: "name",
          },
          {
            Header: "Quantity",
            accessor: "quantity",
          },
          {
            Header: "Fcode",
            accessor: "fcode",
          },
          {
            Header: "Calcium %",
            accessor: "calcium_content",
          },
          {
            Header: "Magnesium %",
            accessor: "magnesium_content",
          },
          {
            Header: "Moly %",
            accessor: "moly_content",
          },
          {
            Header: "Nitrogen %",
            accessor: "nitrogen_content",
          },
          {
            Header: "Zinc %",
            accessor: "zinc_content",
          },
          {
            Header: "TBN %",
            accessor: "TBN_content",
          },
          {
            Header: "Phosphorus %",
            accessor: "phosphorus_content",
          },
          {
            Header: "Sulfur %",
            accessor: "sulfur_content",
          },
          {
            Header: "Boron %",
            accessor: "boron_content",
          },
        ],
        []
      );
    
      return (
        <>
          <Heading heading='RawProducts Table'/>
          <Table columns={columns_table} data={table_data}/>
        </>
        );
    }
    
    export default ListRawProducts;