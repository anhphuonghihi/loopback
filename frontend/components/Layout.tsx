import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Header from './Header';
interface Props {
  children: React.ReactNode;
}
export const Layout: React.FC<Props> = ({ children }: Props) => {

  return (
    <Paper style={{ height: '100vh' }}>
      <Header />
      <Box component="main" >
        {children}
      </Box>
    </Paper>
  );
};