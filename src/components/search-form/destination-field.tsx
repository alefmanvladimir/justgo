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

const DestinationField: React.FC<{options: CityType[], fetchCities: (str: string)=>void }> = (props) => {
    const {options, fetchCities} = props
    const [open, setOpen] = useState(false);
    const searchData = useStore(searchRideData)

    const handleOpen = () => setOpen(true);
    const handleBack = () => setOpen(false)
    const handleClose = () => {
        setOpen(false)
        setSearchRide({
            ...searchData,
            destination: ""
        })
    }

    const handleSetDestination = (destination: string) =>{
        setSearchRide({
            ...searchData,
            destination
        })
    }

    const handleInputChange = async (event: React.SyntheticEvent, value: string) => {
        handleSetDestination(value)
        fetchCities(value)
    };

    return (
        <div>
            <div style={{
                display: "flex"
            }}>

                <TextField
                    label={"Going to..."}
                    onClick={handleOpen}
                    variant="standard"
                    value={searchData.destination}
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
                                    handleSetDestination(e.target.textContent)
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
                                label={"Going to..."}

                                variant="standard"
                                inputRef={input => input && input.focus()}
                            >
                            </TextField>
                        )}
                        onInputChange={handleInputChange}
                        inputValue={searchData.destination}

                    />
                </Box>
                <ClearRoundedIcon onClick={handleClose} sx={{ fontSize: 30, color: 'hsla(189, 13%, 50%, 1)' }}></ClearRoundedIcon>
            </FullScreenModal>
        </div>
    );
};

export default DestinationField;
