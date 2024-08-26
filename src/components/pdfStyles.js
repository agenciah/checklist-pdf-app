// pdfStyles.js
export const pdfStyles = {
  title: {
    text: 'Checklist de Supervisión',
    x: 75,
    y: 60,
    fontSize: 16,
    fontStyle: 'bold',
    color: '#000000',
  },
  sectionTitles: {
    entrada: { text: 'Entrada', x: 20, y: 50, fontSize: 14, fontStyle: 'bold', color: '#000000' },
    alberca: { text: 'Alberca', x: 20, y: 90, fontSize: 14, fontStyle: 'bold', color: '#000000' },
    gimnasio: { text: 'Gimnasio', x: 20, y: 130, fontSize: 14, fontStyle: 'bold', color: '#000000' },
    jardineria: { text: 'Jardinería', x: 20, y: 170, fontSize: 14, fontStyle: 'bold', color: '#000000' },
  },
  content: {
    x: 20,
    fontSize: 12,
    fontStyle: 'normal',
    color: '#000000',
  },
  comments: {
    title: 'Comentarios:',
    x: 20,
    y: 140,
    fontSize: 12,
    fontStyle: 'bold',
    color: '#000000',
  },
  images: [
    { x: 90, y: 70, width: 50, height: 50 },
    { x: 90, y: 130, width: 50, height: 50 },
    { x: 150, y: 70, width: 50, height: 50 },
    { x: 150, y: 130, width: 50, height: 50 },
  ],
};
