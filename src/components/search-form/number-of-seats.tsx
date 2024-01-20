import {InputAdornment, TextField, Typography } from "@mui/material";
import { useState } from "react";
import FullScreenModal from "../common/full-screen-modal";
import {FC} from "react";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import { useStore } from "@nanostores/react";
import { searchRideData, setSearchRide } from "../../store/search-ride-data";

const NumberOfSeats: FC = () => {
    const [open, setOpen] = useState(false);
    const searchData = useStore(searchRideData)
    const [_numberOfSeats, setNumberOfSeats] = useState(searchData.numberOfSeats)


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const addSeat = () => {
        if(_numberOfSeats<10)
            setNumberOfSeats(_numberOfSeats+1)
    }

    const removeSeat = () => {
        if(_numberOfSeats>1)
            setNumberOfSeats(_numberOfSeats-1)
    }

    const confirm = () => {
        setSearchRide({
            ...searchData,
            numberOfSeats: _numberOfSeats
        })
        handleClose()
    }

    return <div style={{borderLeft: '1px solid #dedede', width: '30%'}}>
        <TextField
            onClick={handleOpen}
            variant="standard"

            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <PersonAddAltIcon sx={{paddingRight: '10px'}} />
                    </InputAdornment>
                ),
            }}
            value={searchData.numberOfSeats}
            sx={{
                paddingLeft: '15px',
                '& .MuiInput-underline:before': {
                    borderBottom: 'none',
                },
                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                    borderBottom: 'none',
                },
                '& .MuiInput-underline:after': {
                    borderBottom: 'none',
                },
            }}
        />
        <FullScreenModal open={open}>
            <ClearRoundedIcon onClick={handleClose} sx={{ fontSize: 30, color: 'hsla(189, 13%, 50%, 1)', position: "absolute" }}></ClearRoundedIcon>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center'
            }}>
                <Typography style={{color: '#054652' , fontWeight: 'bold', fontSize: "30px"}}>Number of seats to book</Typography>
                <div style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                }}>
                    <RemoveCircleOutlineRoundedIcon style={{fontSize: '60px', color: "hsla(197, 100%, 48%, 1)"}} onClick={removeSeat}/>
                    <Typography sx={{color: '#054652', fontWeight: 'bold'}} variant="h1" component="h1">{_numberOfSeats}</Typography>
                    <AddCircleOutlineRoundedIcon style={{fontSize: '60px', color: "hsla(197, 100%, 48%, 1)"}} onClick={addSeat}/>
                </div>
                <ArrowCircleRightRoundedIcon style={{fontSize: '80px', color: "hsla(197, 100%, 48%, 1)"}} onClick={confirm}/>
            </div>


        </FullScreenModal>
    </div>
}

export default NumberOfSeats