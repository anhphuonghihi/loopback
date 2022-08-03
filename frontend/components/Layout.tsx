import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
interface Props {
    children: React.ReactNode;
  }
export const Layout: React.FC<Props> = ({ children }: Props) => {
  
    return (
      <Paper style={{ height: '100vh' }}>
        <Box component="main" >
          {children}
        </Box>
      </Paper>
    );
  };