import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button, Snackbar } from "@mui/material";

export default function CarList() {

    // states
    const [cars, setCars] = useState([{ brand: '', model: '', color: '', fuel: '', modelYear: '', price: '' }]);
    const [openSackbar, setOpenSnackbar] = useState(false);
    const [msgSnackbar, setMsgSnackbar] = useState("")

    const [colDefs, setColDefs] = useState([
        { field: 'brand' },
        { field: 'model' },
        { field: 'color' },
        { field: 'fuel' },
        { field: 'modelYear' },
        { field: 'price' },
        {
            cellRenderer: (params) =>
                <Button size="small" color="error" onClick={() => deleteCar(params)}>Delete</Button>, width: 120
        }
    ]);

    useEffect(() => getCars(), []); // when [] then fetch only after first rendering

    // functions
    // getCars
    const getCars = () => {
        fetch('https://carrestservice-carshop.rahtiapp.fi/cars', { method: 'GET' })
            .then(response => {
                //console.log(response)
                if (response.ok)
                    return response.json();
            })
            .then(data => {
                //console.log(data._embedded.cars);
                setCars(data._embedded.cars);
            })
            .catch(err => console.error(err)
            )
    }

    // deleteCar
    const deleteCar = (params) => {
        //console.log(params.data);
        console.log(params.data._links.car.href);
        fetch(params.data._links.car.href, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    //window.alert("CAR DELETED!!!");
                    setOpenSnackbar(true);
                    setMsgSnackbar("Delete ok");
                }
                else {
                    //window.alert("NOT WORKING")
                    setOpenSnackbar(true);
                    setMsgSnackbar("Delete ok");
                }
            })
            .catch(err => console.error(err)
            )

    }

    // return
    return (
        <>
            <div className="ag-theme-material" style={{ width: 700, height: 500 }}>
                <AgGridReact
                    rowData={cars}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationPageSize={8}>

                </AgGridReact>
                <Snackbar
                    open={openSackbar}
                    message={msgSnackbar}
                    autoHideDuration={3000}
                    onClose={() => setOpenSnackbar(false)}
                >

                </Snackbar>
            </div>
        </>
    )

}