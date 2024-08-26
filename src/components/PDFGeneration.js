import React from 'react';
import jsPDF from 'jspdf';
import { pdfStyles } from './pdfStyles';
import background from "../images/Diapositiva2.JPG";
import { Button } from '@mui/material';

function PDFGeneration({ checklistData, images }) {
  const handleGeneratePDF = () => {
    const doc = new jsPDF();

    if (background) {
      doc.addImage(
        background,
        'JPEG',
        0,
        0,
        doc.internal.pageSize.getWidth(),
        doc.internal.pageSize.getHeight()
      );
    } else {
      console.error("La imagen de fondo no se ha podido cargar.");
    }

    doc.setFontSize(pdfStyles.title.fontSize || 16);
    doc.setFont(pdfStyles.title.fontStyle || 'normal');
    doc.setTextColor(pdfStyles.title.color || '#000000');
    doc.text(
      pdfStyles.title.text || 'Checklist de Supervisión',
      pdfStyles.title.x || 10,
      pdfStyles.title.y || 10
    );

    let currentY = (pdfStyles.title.y || 20) + 10;

    ['entrada', 'alberca', 'gimnasio', 'jardineria'].forEach((area) => {
      const areaData = checklistData[area];
      const areaTitle = pdfStyles.sectionTitles[area]?.text || area.charAt(0).toUpperCase() + area.slice(1);

      doc.setFontSize(pdfStyles.sectionTitles[area]?.fontSize || 14);
      doc.setFont(pdfStyles.sectionTitles[area]?.fontStyle || 'bold');
      doc.setTextColor(pdfStyles.sectionTitles[area]?.color || '#000000');

      doc.text(
        areaTitle,
        pdfStyles.sectionTitles[area]?.x || 10,
        currentY
      );

      currentY += 8;

      doc.setFontSize(pdfStyles.content.fontSize || 12);
      doc.setFont(pdfStyles.content.fontStyle || 'normal');
      doc.setTextColor(pdfStyles.content.color || '#000000');

      Object.entries(areaData).forEach(([key, value]) => {
        const displayText = `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value || 'No especificado'}`;
        doc.text(
          displayText,
          pdfStyles.content.x || 20,
          currentY
        );
        currentY += 6;
      });

      currentY += 10;
    });

    if (checklistData.comentarios) {
      doc.setFontSize(pdfStyles.comments.fontSize || 12);
      doc.setFont(pdfStyles.comments.fontStyle || 'normal');
      doc.setTextColor(pdfStyles.comments.color || '#000000');

      doc.text(
        pdfStyles.comments.title || 'Comentarios:',
        pdfStyles.comments.x || 10,
        currentY
      );

      currentY += 6;

      doc.text(
        checklistData.comentarios,
        pdfStyles.comments.x || 20,
        currentY,
        {
          maxWidth: doc.internal.pageSize.getWidth() - (pdfStyles.comments.x || 20) * 2,
        }
      );
    }

    if (images && Array.isArray(images)) {
      images.forEach((image, index) => {
        if (image && pdfStyles.images[index]) {
          const { x, y, width, height } = pdfStyles.images[index];
          doc.addImage(image, 'JPEG', x, y, width, height);
        }
      });
    }

    doc.save('Checklist.pdf');
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#FF0000',
          '&:hover': {
            backgroundColor: '#D00000', // Un rojo más oscuro al pasar el cursor
          },
        }}
        onClick={handleGeneratePDF}
      >
  Descargar PDF
</Button>
    </div>
  );
}

export default PDFGeneration;
