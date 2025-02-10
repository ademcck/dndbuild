import React, { useEffect, useState } from 'react';
import { TextField, List, ListItem, Typography, CircularProgress } from '@mui/material';

const FontPicker = (props) => {
    const [fonts, setFonts] = useState([]);
    const [filteredFonts, setFilteredFonts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFont, setSelectedFont] = useState('');
    const [loading, setLoading] = useState(false);

    // Google Fonts API'den fontları al
    useEffect(() => {
        const fetchFonts = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://fonts.google.com/metadata/fonts`);
                const data = await response.json();
                setFonts(data.axisRegistry);
                setFilteredFonts(data.axisRegistry);
                console.log(data.axisRegistry)
            } catch (error) {
                console.error('Error fetching fonts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFonts();
    }, []);

    // Arama terimine göre fontları filtrele
    useEffect(() => {
        if (searchTerm === '') {
            setFilteredFonts(fonts);
        } else {
            const filtered = fonts.filter((font) =>
                font.displayName.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredFonts(filtered);
        }
    }, [searchTerm, fonts]);

    useEffect(() => {
        selectedFont && props.setFontFamily(selectedFont);    
    }, [selectedFont]);

    return (
        <div className='bg-white p-3 rounded-md ' style={{ width: "300px" }} >
            <TextField
                label="Search Fonts"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ marginBottom: 2 }}
            />

            {loading ? (
                <CircularProgress />
            ) : (
                <List
                    sx={{
                        maxHeight: '300px',
                        overflowY: 'auto',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        padding: 0,
                    }}
                >
                    {filteredFonts.map((font) => (
                        <ListItem
                            key={font.displayName}
                            button
                            onClick={() => setSelectedFont(font.displayName)}
                            sx={{
                                fontFamily: font.displayName,
                                fontSize: '18px',
                                cursor: 'pointer',
                                padding: '10px 16px',
                            }}
                        >
                            {font.displayName}
                        </ListItem>
                    ))}
                </List>
            )}

            {selectedFont && (
                <Typography
                    variant="h6"
                    sx={{ marginTop: 2, fontFamily: selectedFont }}
                >
                    Selected Font: {selectedFont}
                </Typography>
            )}
        </div>
    );
};

export default FontPicker;
