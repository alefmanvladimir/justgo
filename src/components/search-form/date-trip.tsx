import React, { useState } from 'react';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';
import FullScreenModal from '../common/full-screen-modal';
import { isToday, isTomorrow, format } from 'date-fns';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { InputAdornment } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { searchRideData, setSearchRide } from '../../store/search-ride-data';
import { useStore } from "@nanostores/react"

const StaticDatePick: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [convertedDate, setContertedDate] = useState('Today')
    const searchData = useStore(searchRideData)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleDateChange = (date: Date | null) => {
        setSearchRide({
            ...searchData,
            date
        })
        const currentDate = new Date()

        if (date) {
            if (isToday(date)) {
                console.log('Выбранная дата - сегодня.');
                setContertedDate("Today")
            } else if (isTomorrow(date)) {
                console.log('Выбранная дата - завтра.');
                setContertedDate("Tommorow")
            } else {
                console.log('Выбранная дата не является ни сегодняшней, ни завтрашней.');
                setContertedDate(format(date, 'EEE, d MMM')); // Форматирует дату в "Wed, 10 Jan"
            }
        }

    };

    return (
        <div>
            <div style={{
                display: "flex"
            }}>
                <TextField
                    onClick={handleOpen}
                    variant="standard"
                    value={convertedDate}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <CalendarMonthOutlinedIcon sx={{paddingRight: '2px'}} />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
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

            </div>
            <FullScreenModal open={open}>
                <ArrowBackIcon onClick={handleClose} sx={{ fontSize: 30, color: 'hsla(189, 13%, 50%, 1)' }} ></ArrowBackIcon>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <StaticDatePicker
                        sx={{margin: "25px -10px"}}
                        displayStaticWrapperAs="mobile"
                        openTo="day"
                        value={searchData.date}
                        onChange={(newValue: Date | null) => {
                            handleDateChange(newValue)
                            handleClose()
                        }}
                    />
                </LocalizationProvider>
            </FullScreenModal>
        </div>
    );
};

export default StaticDatePick;
