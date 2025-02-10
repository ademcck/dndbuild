import { makeStyles } from '@mui/styles';
const useStyles = makeStyles((theme) => ({
  textField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      backgroundColor: theme.palette.mode === 'dark' ? '#2c2c2c' : '#ffffff',
      color: theme.palette.mode === 'dark' ? '#f5f5f5' : '#000',
      '& fieldset': {
        borderColor: theme.palette.mode === 'dark' ? '#6b6b6b' : '#d9d9d9',
      },
      '&:hover fieldset': {
        borderColor: theme.palette.mode === 'dark' ? '#8a8a8a' : '#bdbdbd',
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#3f51b5',
      },
    },
    '& .MuiInputLabel-root': {
      color: theme.palette.mode === 'dark' ? '#cfcfcf' : '#6b6b6b',
    },
  },
}));

export default useStyles;
