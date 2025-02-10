import React, { useState } from 'react'
import { Box, Button, Container, Typography, Select, MenuItem } from '@mui/material'
import { TfiClose } from 'react-icons/tfi';
import { useSelector, useDispatch } from 'react-redux';
import { setLayoutApi } from '../../../redux/reducers/DnDapp/ApiReducer';

export default function ChoiceApiComponent() {
    const dispatch = useDispatch();
    const { layoutApi, requestToAPI } = useSelector((state) => state.api);
    const { mode } = useSelector((state) => state.sidebar);

    const [selectedApi, setSelectedApi] = useState('');

    const classText = mode === 'dark' ? 'text-white' : 'text-_black';

    return (
        <Container className={`${mode === 'dark' ? 'bg-_black' : 'bg-white'}`} sx={{
            position: "fixed",
            padding: "20px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgrounColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000
        }} maxWidth="sm">
            <TfiClose className={`absolute right-0 top-0 size-6 cursor-pointer ${classText}`}
                onClick={() => dispatch(setLayoutApi(!layoutApi))}
            />

            {requestToAPI.length > 0 ? (
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Select
                        value={selectedApi}
                        onChange={(e) => setSelectedApi(e.target.value)}
                        displayEmpty
                        fullWidth
                        sx={{ color: 'white', border: "1px solid white" }}
                    >
                        <MenuItem value="" disabled>
                            Choose an API
                        </MenuItem>
                        {requestToAPI.map((api, index) => (
                            <MenuItem key={index} value={api.apiName}>
                                {api.apiName}
                            </MenuItem>
                        ))}
                    </Select>
                    <Button sx={{ ml: 1 }} onClick={() => console.log("Selected API:", selectedApi)}>
                        Add
                    </Button>
                </Box>
            ) : (
                <Typography variant="h6" component="h2" className={classText}>
                    No API found. Please add an API first.
                </Typography>
            )}
        </Container>
    );
}







