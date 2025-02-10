import React, { useEffect, useMemo, useState } from 'react';
import {
    Box,
    Button,
    CircularProgress,
    Container,
    Grid,
    MenuItem,
    TextField,
    Typography,
    IconButton,
} from '@mui/material';
import CodeEditor from '@uiw/react-textarea-code-editor';
import rehypePrism from 'rehype-prism-plus';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './modeStyle';
import { TfiClose } from "react-icons/tfi";
import { addKeys, toggleApiWindow } from '../../../redux/reducers/DnDapp/ApiReducer';
import testApiRequest from './TestRequest';
import CloseIcon from '@mui/icons-material/Close';

const requestTypes = ['GET', 'POST', 'PUT', 'DELETE'];

const ApiRequestForm = () => {
    const { mode } = useSelector((state) => state.sidebar);
    const { keys, requestToAPI, activeApiName } = useSelector((state) => state.api);

    const dispatch = useDispatch();
    const [url, setUrl] = useState(requestToAPI.find(api => api.apiName === activeApiName)?.url || '');
    const [headers, setHeaders] = useState(requestToAPI.find(api => api.apiName === activeApiName)?.headers ||'{\n  "Authorization": "Bearer token"\n}');
    const [body, setBody] = useState(requestToAPI.find(api => api.apiName === activeApiName)?.body ||'{\n  "key": "value"\n}');
    const [method, setMethod] = useState(requestToAPI.find(api => api.apiName === activeApiName)?.method  ||'GET');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [apiKeys, setApiKeys] = useState(keys[activeApiName] || []);
    const classes = useStyles();

    const classText = mode === 'dark' ? 'text-white' : 'text-_black'

    const handleRemoveKey = (index) => {
        const updatedKeys = [...apiKeys];
        updatedKeys.splice(index, 1);
        setApiKeys(updatedKeys);
    };

    const memoizedApiKeys = useMemo(() => {
        return apiKeys.map((key, index) => (
            <div key={index} className="relative p-2 bg-rose-700 rounded-md text-white">
                {key}
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: '-8px',
                        right: '-8px',
                        cursor: 'pointer',
                        zIndex: 1,
                    }}
                    onClick={() => handleRemoveKey(index)}
                >
                    <CloseIcon sx={{ fontSize: '15px', color: 'rgb(253 164 175 / 1)' }} className="w-full h-full" />
                </IconButton>
            </div>
        ));
    }, [apiKeys]);

    return (
        <div
            className="w-screen h-screen p-2 absolute overflow-y-scroll"
            style={{
                backgroundColor: '#00000046',
                zIndex: '10',
                backdropFilter: 'blur(10px)',
            }}
        >
            <Container className={`${mode === 'dark' ? 'bg-_black' : 'bg-white'}`} sx={{
                position: "fixed",
                padding: "20px",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgrounColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 1000
            }} maxWidth="sm"  >
                <TfiClose className={`absolute right-5 top-5  size-6  cursor-pointer ${classText}`} onClick={() => dispatch(toggleApiWindow())} />
                <Typography className={`${mode === 'dark' ? 'text-white' : 'text-black'}`} variant="h4" component="h1" gutterBottom>
                    API Request Form
                </Typography>
                <Box component="form" noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <TextField
                                className={classes.textField}
                                fullWidth
                                label="Request URL"
                                variant="outlined"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                className={classes.textField}
                                select
                                fullWidth
                                label="Request Method"
                                variant="outlined"
                                value={method}
                                onChange={(e) => setMethod(e.target.value)}
                                required
                            >
                                {requestTypes.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className={classText} variant="h6">Headers (JSON format)</Typography>
                            <Box sx={{ maxHeight: '150px', overflow: "auto" }}>

                                <CodeEditor
                                    value={headers}
                                    language="json"
                                    placeholder='{"Content-Type": "application/json"}'
                                    onChange={(e) => setHeaders(e.target.value)}
                                    padding={15}
                                    data-color-mode={mode === 'dark' ? 'dark' : 'light'}
                                    rehypePlugins={[
                                        [rehypePrism, { ignoreMissing: true, showLineNumbers: true }]
                                    ]}
                                    style={{
                                        fontSize: 14,
                                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                                        borderRadius: '4px',

                                        height: '150px',
                                        overflow: "auto",
                                    }}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className={classText} variant="h6">Body (JSON format)</Typography>
                            <Box sx={{ maxHeight: '150px', overflow: "auto" }}>
                                <CodeEditor
                                    value={body}
                                    language="json"
                                    placeholder='{"key": "value"}'
                                    onChange={(e) => setBody(e.target.value)}
                                    padding={15}
                                    data-color-mode={mode === 'dark' ? 'dark' : 'light'}
                                    wrap='true'
                                    rehypePlugins={[
                                        [rehypePrism, { ignoreMissing: true, showLineNumbers: true }]
                                    ]}

                                    style={{
                                        fontSize: 14,
                                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                                        borderRadius: '4px',
                                        lineHeight: '1.6',
                                        whiteSpace: 'pre-wrap',  // Uzun satırları sarar
                                    }}
                                    disabled={method === 'GET'}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <div className="flex justify-between items-center">

                                <Typography className={classText} variant="h6">Response Raw: </Typography>
                                <div className='w-80 flex gap-2 overflow-x-auto justify-end'>
                                    {memoizedApiKeys}
                                </div>
                            </div>

                            <Box sx={{ maxHeight: '150px', overflow: "auto" }}>
                                <CodeEditor
                                    value={response}
                                    language="json"
                                    placeholder='{"key": "value"}'
                                    padding={15}
                                    data-color-mode={mode === 'dark' ? 'dark' : 'light'}
                                    wrap='true'
                                    rehypePlugins={[
                                        [rehypePrism, { ignoreMissing: true, showLineNumbers: true }]
                                    ]}

                                    style={{
                                        fontSize: 14,
                                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                                        borderRadius: '4px',
                                        lineHeight: '1.6',
                                        whiteSpace: 'pre-wrap',  // Uzun satırları sarar
                                    }}
                                    disabled
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={6} sx={{ mt: 3 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={loading} // Yükleme sırasında butonu devre dışı bırakır
                                onClick={async (event) => {
                                    event.preventDefault();
                                    setLoading(true); // Yükleme başlıyor
                                    try {
                                        const res = await testApiRequest({ url, headers, body, method });
                                        res && setResponse(JSON.stringify(res.data, null, 2));
                                        setApiKeys(res?.data ? Object.keys(res.data) : []);
                                    } catch (error) {
                                        console.error(error);
                                    } finally {
                                        setLoading(false); // Yükleme tamamlandı
                                    }
                                }}
                            >
                                {loading ? <CircularProgress size={24} color={mode === 'dark' ? 'warning' : 'info'} /> : 'Test Request'}
                            </Button>
                        </Grid>
                        <Grid item xs={6} sx={{ mt: 3 }}>
                            <Button onClick={() => dispatch(addKeys({ apiName: activeApiName, keys: apiKeys, url: url, method: method, headers: headers, body: body }))} variant="contained" color="warning" fullWidth>
                                Save Request
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </div>
    );
};

export default ApiRequestForm;
