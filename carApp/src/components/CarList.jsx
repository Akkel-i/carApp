import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button, Snackbar } from "@mui/material";

import AddCar from "./AddCar";
import EditCar from "./EditCar";

export default function CarList() {

    // states
    const [cars, setCars] = useState([{ brand: '', model: '', color: '', fuel: '', modelYear: '', price: '' }]);
    const [openSackbar, setOpenSnackbar] = useState(false);
    const [msgSnackbar, setMsgSnackbar] = useState("")
    const URL = 'https://carrestservice-carshop.rahtiapp.fi/cars';

    const [colDefs, setColDefs] = useState([
        { field: 'brand' },
        { field: 'model' },
        { field: 'color' },
        { field: 'fuel' },
        { field: 'modelYear' },
        { field: 'price' },
        {
            cellRenderer: (params) =>
                <EditCar updateCar={updateCar} params={params}/>
        },
        {
            cellRenderer: (params) =>
                <Button size="small" color="error" onClick={() => deleteCar(params)}>Delete</Button>, width: 120
        }
    ]);

    useEffect(() => getCars(), []); // when [] then fetch only after first rendering

    // functions
    // getCars
    const getCars = () => {
        fetch(URL, { method: 'GET' })
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
        if (window.confirm("ootko varma?")) {
            console.log(params.data._links.car.href);
            fetch(params.data._links.car.href, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        //window.alert("CAR DELETED!!!");
                        setMsgSnackbar("Delete ok");
                        setOpenSnackbar(true);
                        getCars();
                    }
                    else {
                        //window.alert("NOT WORKING")
                        setMsgSnackbar("Delete not ok");
                        setOpenSnackbar(true);
                    }
                })
                .catch(err => console.error(err)
                )
        }
    }

    const addCar = (car) => {
        console.log("carlist, add car")
        fetch(URL, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(car)
        })
        .then(response => {
            console.log("response:" + response);
            if (response.ok) {
                console.log("response ok");
                return response.json;
            } else {
                throw new Error('Datan vienti bäkkäriin ei onnistunut');
            }
        })
        .then(data => {
            console.log("parsed json:" + data);
            getCars();
        })
        .catch(err => console.error(err))
    }


    const updateCar = (URL, updateCar) => {
        console.log("carlist, edit car")
        fetch(URL, {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(updateCar)
        })
        .then(response => {
            console.log("response:" + response);
            if (response.ok) {
                console.log("response ok");
                return response.json;
            } else {
                throw new Error('Datan vienti bäkkäriin ei onnistunut');
            }
        })
        .then(data => {
            console.log("parsed json:" + data);
            getCars();
        })
        .catch(err => console.error(err))
    }

    // return
    return (
        <>
            <AddCar addCar={addCar}/>
            <div className="ag-theme-material" style={{ width: 800, height: 500, margin: 'auto' }}>
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