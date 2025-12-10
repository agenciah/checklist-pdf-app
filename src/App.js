import React from 'react';
import ChecklistForm from './components/CheckListForm';
import { Container, Typography, AppBar, Toolbar, CssBaseline } from '@mui/material';
import logo from "./images/Residentia Logo without name.png"

function App() {
  return (
    <div style={{ backgroundColor: 'rgb(38, 169, 225)', minHeight: '100vh' }}>
      <AppBar position="static" style={{ backgroundColor: 'rgb(1, 98, 153)' }}>
        <Toolbar>
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

