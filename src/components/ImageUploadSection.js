import React from 'react';
import { Box, Typography } from '@mui/material';

function ImageUploadSection({ onImageChange }) {
  return (
    <Box sx={{ my: 3 }}>
      <Typography variant="h6">Agregar imágenes</Typography>
      {[1, 2, 3].map((i) => (
        <Box key={i} sx={{ my: 1 }}>
          <input type="file" onChange={(e) => onImageChange(e, i)} />
        </Box>
      ))}
    </Box>
  );
}

export default ImageUploadSection;
