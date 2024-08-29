import React from 'react';
import ChecklistForm from './components/CheckListForm';
import { Container, Typography, AppBar, Toolbar, CssBaseline } from '@mui/material';
import logo from "./images/Residentia Logo without name.png"

function App() {
  return (
    <div style={{ backgroundColor: 'rgb(38, 169, 225)', minHeight: '100vh' }}>
      <AppBar position="static" style={{ backgroundColor: 'rgb(1, 98, 153)' }}>
        <Toolbar>
          <img src={logo} alt="Agencia Habitat Logo" style={{ height: 40, marginRight: 15 }} />
          <Typography variant="h6" style={{ color: 'white', flexGrow: 1 }}>
            Agencia Habitat
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Container maxWidth="md">
          <CssBaseline />
          <ChecklistForm />
        </Container>
      </Container>
    </div>
  );
}

export default App;

