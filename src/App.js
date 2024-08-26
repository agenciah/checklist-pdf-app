import React from 'react';
import ChecklistForm from './components/CheckListForm';
import { Container, CssBaseline } from '@mui/material';

function App() {
  return (
    <Container maxWidth="md">
      <CssBaseline />
      <ChecklistForm />
    </Container>
  );
}

export default App;
