import React from 'react';
import { TextField, Box, Typography } from '@mui/material';

function CommentsSection({ comments, handleComentariosChange }) {
  return (
    <Box sx={{ my: 3 }}>
      <Typography variant="h6">Comentarios</Typography>
      <TextField
        label="Comentarios"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={comments}
        onChange={handleComentariosChange}
        sx={{ mt: 1 }}
      />
    </Box>
  );
}

export default CommentsSection;
