import React, { useState } from 'react';
import { Button, Modal, Box, Typography, TextField, InputAdornment } from '@mui/material';
import Autocomplete, { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import FullScreenModal from '../common/full-screen-modal';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { CityType } from './search-from';
import TripOriginOutlinedIcon from '@mui/icons-material/TripOriginOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import {searchRideData, setSearchRide } from '../../store/search-ride-data';
import { useStore } from '@nanostores/react';
import ChangeCircleRoundedIcon from '@mui/icons-material/ChangeCircleRounded';

// Стили для модального окна
const modalStyle = {
    // position: 'absolute' as const, // использование 'as const' для корректного типа
    // top: '50%',
    // left: '50%',
    // transform: 'translate(-50%, -50%)',
    width: '65%',
    bgcolor: 'background.paper',
    padding: "0 10px"

    // boxShadow: 24,
    // p: 4,
    // overflow: 'hidden',
    // maxHeight: '90%',
    // padding: "10px"
};

const DepartureField: React.FC<{options: CityType[], fetchCities: (str: string)=>void, children?: React.ReactNode }> = (props) => {
    const {options, fetchCities, children} = props
    const [open, setOpen] = useState(false);
    const searchData = useStore(searchRideData)

    const handleOpen = () => setOpen(true);
    const handleBack = () => setOpen(false)
    const handleClose = () => {
        setOpen(false)
        setSearchRide({
            ...searchData,
            departure: ""
        })
    }

    const handleSetDeparture = (departure: string) =>{
        setSearchRide({
            ...searchData,
            departure
        })
    }

    const handleInputChange = async (event: React.SyntheticEvent, value: string) => {
        handleSetDeparture(value)
        fetchCities(value)
    };

    const handleReverseDirection = () => {
        const _gap = searchData.destination
        setSearchRide({
            ...searchData,
            destination: searchData.departure,
            departure: _gap
        })
    }

    return (
        <div>
            <div style={{
                display: "flex"
            }}>

                <TextField
                    label={"Leaving from..."}
                    onClick={handleOpen}
                    variant="standard"
                    value={searchData.departure}
                    sx={{width: '100%'}}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <TripOriginOutlinedIcon sx={{padding: '3px 3px', width: "17px"}} />
                            </InputAdornment>
                        ),
                    }}
                >
                </TextField>
                <ChangeCircleRoundedIcon sx={{ color: 'hsla(189, 13%, 50%, 1)', fontSize: 30, margin: '10px 0 10px 10px'}} onClick={handleReverseDirection} />
            </div>


            <FullScreenModal open={open}>
                <ArrowBackIcon onClick={handleBack} sx={{ fontSize: 30, color: 'hsla(189, 13%, 50%, 1)' }} ></ArrowBackIcon>
                <Box sx={modalStyle}>
                    <Autocomplete
                        freeSolo
                        options={options}
                        getOptionLabel={(option: any) => `${option.label} `} // Указываем, что option это объект CityType
                        clearIcon={null}
                        renderOption={(props, option) => (
                            <Box component="li" {...props} >
                                <Box sx={{width: '90%'}} onClick={(e: any)=>{
                                    e.preventDefault()
                                    handleSetDeparture(e.target.textContent)
                                    handleBack()
                                }}>
                                    <b>{option.label}</b>
                                    <div style={{color: "hsla(189, 13%, 50%, 1)"}}>{option.country}</div>
                                </Box>

                                <ArrowForwardIosRoundedIcon sx={{ float: 'right', fontSize: 20, color: 'hsla(189, 13%, 50%, 1)' }}/>
                            </Box>
                        )}
                        renderInput={(params: AutocompleteRenderInputParams) => (
                            <TextField
                                {...params}
                                label={"Leaving from..."}

                                variant="standard"
                                inputRef={input => input && input.focus()}
                            >
                            </TextField>
                        )}
                        onInputChange={handleInputChange}
                        inputValue={searchData.departure}

                    />
                </Box>
                <ClearRoundedIcon onClick={handleClose} sx={{ fontSize: 30, color: 'hsla(189, 13%, 50%, 1)' }}></ClearRoundedIcon>
            </FullScreenModal>
        </div>
    );
};

export default DepartureField;
