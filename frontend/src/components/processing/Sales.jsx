import React, { useState,useEffect,useMemo} from "react";
import axios from "axios";
import Heading from "../extras/Heading";
import Table from "../extras/Table";
export default function Sales(){
    const [products,setProducts]=useState([]);
    const getdata = async() => {
        try{
            const response= await axios.get('http://localhost:8000/processing/salestable')
            console.log(response)
            setProducts(response.data);
        }
        catch(e){
            console.log(e);
        }
    };
    useEffect(() => {
        getdata();
      }, []);
    const table_data = useMemo(
        () => [...products],
        [products]
      );
    
      const columns_table = useMemo(
        () => [
          {
            Header: "Name",
            accessor: "name",
          },
          {
            Header: "Price Per KG",
            accessor: "price_per_kg",
          },
          {
            Header: "PDF",
            accessor: "",
          }
        ],
        []
      );
    

    return(
        <>
        <Heading heading='Sales Table'/>
        <Table columns={columns_table} data={table_data}/>
        </>
    );
}