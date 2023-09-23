import React, { useState,useEffect,useMemo} from "react";
import axios from "axios";
import useAxios from "../../utils/useAxios";
import Heading from "../extras/Heading";
import Table from "../extras/Table";
export default function ProductList(){
    const api=useAxios()
    const [products,setProducts]=useState([]);
    const getdata = async() => {
        try{
            const response= await api.get('http://localhost:8000/processing/list/')
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
            Header: "Raw Materials",
            accessor: "raw_materials",
          },
          {
            Header: "Weights",
            accessor: "weights",
          },
          {
            Header: "Sequence",
            accessor: "sequences",
          },
        ],
        []
      );
    

    return(
        <>
        <Heading heading='Product List'/>
        <Table columns={columns_table} data={table_data}/>
        </>
    );
}