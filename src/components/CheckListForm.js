import React, { useState, useEffect } from 'react';
import ChecklistSection from './CheckListSection';
import CommentsSection from './CommentsSection';
import PDFGeneration from './PDFGeneration';
import { Box, Button, Typography } from '@mui/material';

import ImageCropDialog from './Crop/ImageCropDialog';

function ChecklistForm() {
  const initialChecklistData = {
    entrada: { porton: '', caseta: '', cctv: '', baño: '', puertaPeatonal: '' },
    alberca: { terraza: '', mobiliario: '', tarja: '', cuartoDeMaquinas: '' },
    gimnasio: { bicicletas: '', caminadoras: '', estadoGeneral: '' },
    jardineria: {areasComunes:'', exteriores: '', areaPrincipal: ''},
    comentarios: '',
  };

  const [checklistData, setChecklistData] = useState(initialChecklistData);
  const [images, setImages] = useState([null, null, null]);
  const [imageToCrop, setImageToCrop] = useState(null);
  const [croppingIndex, setCroppingIndex] = useState(null);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('checklistData'));
    if (savedData) {
      setChecklistData((prevData) => ({ ...prevData, ...savedData }));
    }
  }, []);

  const handleInputChange = (e, area, field) => {
    const value = e.target.value;
    setChecklistData((prevData) => ({
      ...prevData,
      [area]: { ...prevData[area], [field]: value },
    }));
  };

  const handleComentariosChange = (e) => {
    const value = e.target.value;
    setChecklistData((prevData) => ({ ...prevData, comentarios: value }));
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageToCrop(event.target.result);
        setCroppingIndex(index);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedImage) => {
    const newImages = [...images];
    newImages[croppingIndex] = croppedImage;
    setImages(newImages);
    setImageToCrop(null);
  };

  const handleSaveToLocalStorage = () => {
    localStorage.setItem('checklistData', JSON.stringify(checklistData));
    alert('Checklist guardado');
  };

  return (
    <Box sx={{ 
      backgroundColor: 'white',
      padding: 3,
      borderRadius: 2,
      boxShadow: 3,
      display: 'flex',
      flexDirection: 'column',
      gap: 2, }}
      >
      <Typography variant="h5" sx={{ color: 'rgb(1, 98, 153)', marginBottom: 2 }}>
        Checklist de Supervisión
      </Typography>

      <ChecklistSection
        title="Entrada"
        fields={['porton', 'caseta', 'cctv', 'baño', 'puertaPeatonal']}
        area="entrada"
        checklistData={checklistData}
        handleInputChange={handleInputChange}
      />

      <ChecklistSection
        title="Alberca"
        fields={['terraza', 'mobiliario', 'tarja', 'cuartoDeMaquinas']}
        area="alberca"
        checklistData={checklistData}
        handleInputChange={handleInputChange}
      />

      <ChecklistSection
        title="Gimnasio"
        fields={['bicicletas', 'caminadoras', 'estadoGeneral']}
        area="gimnasio"
        checklistData={checklistData}
        handleInputChange={handleInputChange}
      />

      <ChecklistSection
        title="Jardineria"
        fields={['areasComunes', 'exteriores', 'areaPrincipal']}
        area="jardineria"
        checklistData={checklistData}
        handleInputChange={handleInputChange}
      />

      <Box sx={{ my: 3 }}>
        <Typography variant="h6">Agregar imágenes "Opcional"</Typography>
        {[0, 1, 2, 3].map((index) => (
          <Box key={index} sx={{ my: 1 }}>
            <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, index)} />
          </Box>
        ))}
      </Box>

      {imageToCrop && (
        <ImageCropDialog
          imageSrc={imageToCrop}
          onCropComplete={handleCropComplete}
          onClose={() => setImageToCrop(null)}
        />
      )}

      <CommentsSection
        comments={checklistData.comentarios}
        handleComentariosChange={handleComentariosChange}
      />

      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSaveToLocalStorage}
        sx={{
          backgroundColor: 'rgb(38, 169, 225)',
          '&:hover': { backgroundColor: 'rgb(1, 98, 153)' },
          color: 'white',
        }}
      >
        Guardar Checklist
      </Button>

      <PDFGeneration checklistData={checklistData} images={images || []} />
    </Box>
  );
}

export default ChecklistForm;
