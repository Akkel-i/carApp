import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditCar(props) {


    const [car, setCar] = React.useState({
        brand: '',
        model: '',
        color: '',
        fuel: '',
        modelYear: '',
        price: ''
    })

    // open = false, kun ikkuna on kiinni
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true)
        setCar({
            brand: props.params.data.brand,
            model: props.params.data.model,
            color: props.params.data.color,
            fuel: props.params.data.fuel,
            modelYear: props.params.data.modelYear,
            price: props.params.data.price
        });
    }

    const handleSave = () => {
        console.log("edit: saved a edited car");
        props.updateCar(props.params.data._links.car.href, car);
        setOpen(false)
    }

    const handleCancel = () => {
        setOpen(false)
    }

    return (
        <>
            <Button onClick={handleClickOpen}>Edit</Button>
            <Dialog open={open}>
                <DialogTitle>
                    Edit the car
                </DialogTitle>
                <DialogContent>
                    <TextField
                        margin='dense'
                        label="Brand"
                        value={car.brand}
                        onChange={(e) => setCar({ ...car, brand: e.target.value })}
                        variant="standard">
                    </TextField>
                    <TextField
                        margin="dense"
                        label="Model"
                        value={car.model}
                        onChange={(e) => setCar({ ...car, model: e.target.value })}
                        variant="standard">
                    </TextField>
                    <TextField
                        margin="dense"
                        label="color"
                        value={car.color}
                        onChange={(e) => setCar({ ...car, color: e.target.value })}
                        variant="standard">
                    </TextField>
                    <TextField
                        margin="dense"
                        label="fuel"
                        value={car.fuel}
                        onChange={(e) => setCar({ ...car, fuel: e.target.value })}
                        variant="standard">
                    </TextField>
                    <TextField
                        margin="dense"
                        label="year"
                        value={car.modelYear}
                        onChange={(e) => setCar({ ...car, modelYear: e.target.value })}
                        variant="standard">
                    </TextField>
                    <TextField
                        margin="dense"
                        label="price"
                        value={car.price}
                        onChange={(e) => setCar({ ...car, price: e.target.value })}
                        variant="standard">
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave}>Save edited</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )

}
