export const initialNodes = [
  {
    id: 'body',
    type: 'container',
    deletable: false,
    draggable: false,
    position: { x: 250, y: 0 },
    data: { label: 'Body' },
    style: {
      color: '#fff',
      background: 'rgba(211,83,23,1)',
      border: '1px solid #ddd',
      borderRadius: '3px',
      padding: '10px'
    }
  },
  {
    id: 'header-1',
    type: 'header',
    typeOf: 'header',
    deletable: false,
    position: { x: -150, y: 50 },
    data: { label: 'Header' },
    style: {
      background: '#fff',
      borderRadius: '3px',
      padding: '10px'
    },
    properties: { width: "100%"},
    cName: '',
  },
  {
    id: 'section-1',
    type: 'section',
    typeOf: 'section',
    deletable: false,
    position: { x: 240, y: 150 },
    data: { label: 'Section' },
    style: {
      background: '#fff',
      borderRadius: '3px',
      padding: '10px'
    },
    properties: { width: "100%"},
    cName: '',
  },
  {
    id: 'footer-1',
    type: 'footer',
    typeOf: 'footer',
    position: { x: 650, y: 50 },
    data: { label: 'Footer' },
    style: {
      background: '#fff',
      borderRadius: '3px',
      padding: '10px'
    },
    properties: { width: "100%" },
    cName: '',
  }
];