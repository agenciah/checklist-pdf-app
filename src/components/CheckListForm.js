import React, { useState, useEffect } from 'react';
import ChecklistSection from './CheckListSection';
import CommentsSection from './CommentsSection';
import PDFGeneration from './PDFGeneration';
import { Box, Button, Typography } from '@mui/material';
import logo from '../images/Residentia Logo without name.png'

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
        const newImages = [...images];
        newImages[index] = event.target.result;
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveToLocalStorage = () => {
    localStorage.setItem('checklistData', JSON.stringify(checklistData));
    alert('Checklist guardado');
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 3, border: '1px solid #ddd', borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>
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

      <CommentsSection
        comments={checklistData.comentarios}
        handleComentariosChange={handleComentariosChange}
      />

      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSaveToLocalStorage}
        sx={{ marginTop: 2 }}
      >
        Guardar Checklist
      </Button>

      <PDFGeneration checklistData={checklistData} images={images || []} />
    </Box>
  );
}

export default ChecklistForm;
