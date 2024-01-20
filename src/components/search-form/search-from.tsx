import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import DepartureField from './departure-field';
import DestinationField from './destination-field';
import StaticDatePick from './date-trip';
import FullScreenModal from '../common/full-screen-modal';
import NumberOfSeats from './number-of-seats';
import { useStore } from "@nanostores/react"
import { searchRideData, setSearchRide } from '../../store/search-ride-data';

export interface CityType {
    label: string;
    country: string;
}

const SearchForm: React.FC = () => {

    const [options, setOptions] = useState<CityType[]>([]);
    const searchData = useStore(searchRideData)

    const fetchCities = async (inputValue: string): Promise<void> => {
        // Здесь должен быть вызов API, но для примера просто используем заглушку
        if (inputValue.length > 2) { // Обычно API вызывается, если введено более двух символов
            // const response = await fetch(`Your_API_Endpoint?q=${inputValue}`);
            // const cities = await response.json();
            // setFromCities(cities);
            // Используем заглушку для примера
            setOptions([
                { label: 'Beer-Sheva', country: 'Israel' },
                { label: 'Tel-Aviv', country: 'Israel' },
                { label: 'Haifa', country: 'Israel' },
                { label: 'Eilat', country: 'Israel' },
                { label: 'Ben Gurion', country: 'Israel' },
                // ... Другие города
            ]);
        }
    };



    const handleSetDestination = (destination: string) =>{
        setSearchRide({
            ...searchData,
            destination
        })
    }

    const handleInputChange = async (event: React.SyntheticEvent, value: string) => {
        await fetchCities(value);
    };

    return (
        <div style={{
            backgroundColor: "hsla(197, 100%, 48%, 1)",
            backgroundImage: "linear-gradient(rgba(1,121,163, .64) 0%, rgba(5,71,82, 0) 100%)",
            position: "absolute",
            height: "25%",
            width: "100%"
        }}>
            <h1 style={{color: "#fff"}}>Just pick a trip</h1>
            <div style={{ padding: '0px', maxWidth: '85%', margin: 'auto', boxShadow: "0px 0px 10px 0px #3f4f55a3", background: '#fff', borderRadius: '20px'}}>
            <Stack spacing={1.5} style={{ padding: '20px 20px 0px 20px', margin: "7px"}}>

                <DepartureField
                    options={options}
                    fetchCities={fetchCities}
                />

                <DestinationField
                    options={options}
                    fetchCities={fetchCities}
                />

                <div style={{ padding: '10px 0 5px', display: 'flex'}}>
                    <StaticDatePick/>
                    <NumberOfSeats/>
                </div>


            </Stack>
                <Button variant="contained" style={{ width: '100%', margin: 0, backgroundColor: "hsla(197, 100%, 48%, 1)", padding: 15, borderRadius: '0px 0px 20px 20px'}}>
                    Search
                </Button>
            </div>

        </div>

    );
};

export default SearchForm;
