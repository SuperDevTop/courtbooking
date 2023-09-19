import React from 'react';
import dayjs from 'dayjs';
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Grid } from '@mui/material';
import SearchBar from './SearchBar';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Pagination } from '@mui/material';


const Topbar = () => {
    const [currentPage, setCurrentPage] = useState(1)

    const handlePageChange = (event, page) => {
        setCurrentPage(page)
    }

    const [value, setValue] = useState(dayjs());
    const [today, setToday] = useState(true);

    const changeToday = (event) => {
        setToday(event.target.checked)

        if (event.target.checked) {
            setValue((value) => value.add(-1, 'day'));
        } else {
            setValue((value) => value.add(1, 'day'));
        }
    }

    return (
        <Grid container spacing={1} alignItems='center' maxWidth='xl' textAlign={'center'} my={3}>
            <Grid item xs={12} sm={6} lg={3} justifyContent={'center'}>
                <DatePicker
                    label="Date"
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <SearchBar />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <FormControl component="fieldset" variant="standard">
                    <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch checked={today} onChange={changeToday} name="today" />
                        }
                        label={today ? 'Today' : 'Tomorrow'}
                    />
                    </FormGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <Pagination 
                    page={currentPage}
                    count={5}
                    onChange={handlePageChange}
                    color='primary'
                    showFirstButton
                    showLastButton
                />
            </Grid>
        </Grid>        
    )
}

export default Topbar;