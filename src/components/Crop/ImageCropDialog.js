import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Slider, Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { getCroppedImg } from './GetCroppedImg';

function ImageCropDialog({ imageSrc, onCropComplete, onClose }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  const onCropCompleteCallback = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = async () => {
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
    onCropComplete(croppedImage);
  };

  return (
    <Dialog open onClose={onClose} maxWidth="md">
      <DialogContent>
        <div style={{ position: 'relative', width: '100%', height: 400 }}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={4 / 4} // Puedes ajustar esta proporción
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropCompleteCallback}
          />
        </div>
        <Slider
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          onChange={(e, zoom) => onZoomChange(zoom)}
          aria-labelledby="Zoom"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleCrop} color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ImageCropDialog;
