import { 
    FiBox, 
    FiSidebar, 
    FiPackage, 
    FiFileText, 
    FiImage, 
    FiList, 
    FiEdit, 
    FiCode, 
    FiLayers 
  } from 'react-icons/fi';
  import { 
    AiOutlineInsertRowLeft, 
    AiOutlineInsertRowBelow, 
    AiOutlineForm 
  } from 'react-icons/ai';
  import { 
    MdOutlineDataThresholding, 
    MdOutlineStackedLineChart, 
    MdTableRows, 
    MdOutlineAudioFile, 
    MdOutlineVideoFile 
  } from 'react-icons/md';
  import { 
    CiLink 
  } from 'react-icons/ci';
  import { 
    MdLineStyle 
  } from 'react-icons/md';
  import { 
    RiJavascriptFill, 
    RiTableLine 
  } from 'react-icons/ri';
  import { 
    IoBanOutline, 
    IoTextOutline 
  } from 'react-icons/io5';
  
  export const NAVIGATION = [
    {
      kind: 'header',
      title: 'Layout Elements',
    },
    {
      segment: 'container',
      title: 'Containers',
      icon: <FiBox />,
    },
    {
      segment: 'row',
      title: 'Rows',
      icon: <AiOutlineInsertRowBelow />,
    },
    {
      segment: 'column',
      title: 'Columns',
      icon: <AiOutlineInsertRowLeft />,
    },
    // {
    //   kind: 'divider',
    // },
    // {
    //   kind: 'header',
    //   title: 'Tags',
    // },
    // {
    //   segment: 'metadata',
    //   title: 'Metadatas',
    //   icon: <MdOutlineDataThresholding />, // Group for metadata elements
    //   children: [
    //     {
    //       segment: 'meta',
    //       title: 'Meta',
    //       icon: <MdOutlineStackedLineChart />, // Meta element
    //     },
    //     {
    //       segment: 'link',
    //       title: 'Link',
    //       icon: <CiLink />, // Link element
    //     },
    //     {
    //       segment: 'style',
    //       title: 'Style',
    //       icon: <MdLineStyle />, // Style element
    //     },
    //     {
    //       segment: 'script',
    //       title: 'Script',
    //       icon: <RiJavascriptFill />, // Script element
    //     },
    //     {
    //       segment: 'noscript',
    //       title: 'Noscript',
    //       icon: <IoBanOutline />, // Noscript element
    //     },
    //     {
    //       segment: 'base',
    //       title: 'Base',
    //       icon: <FiSidebar />, // Base element
    //     },
    //   ],
    // },
    // {
    //   kind: 'header',
    //   title: 'Content Sectioning',
    // },
    // {
    //   segment: 'header',
    //   title: 'Header',
    //   icon: <FiPackage />,
    // },
    // {
    //   segment: 'footer',
    //   title: 'Footer',
    //   icon: <FiFileText />,
    // },
    // {
    //   segment: 'section',
    //   title: 'Section',
    //   icon: <FiLayers />,
    // },
    // {
    //   segment: 'article',
    //   title: 'Article',
    //   icon: <FiEdit />,
    // },
    // {
    //   segment: 'aside',
    //   title: 'Aside',
    //   icon: <FiSidebar />,
    // },
    // {
    //   segment: 'nav',
    //   title: 'Navigation',
    //   icon: <FiList />,
    // },
    // {
    //   kind: 'header',
    //   title: 'Media Elements',
    // },
    // {
    //   segment: 'image',
    //   title: 'Image',
    //   icon: <FiImage />, // <img> element
    // },
    // {
    //   segment: 'audio',
    //   title: 'Audio',
    //   icon: <MdOutlineAudioFile />, // <audio> element
    // },
    // {
    //   segment: 'video',
    //   title: 'Video',
    //   icon: <MdOutlineVideoFile />, // <video> element
    // },
    // {
    //   segment: 'canvas',
    //   title: 'Canvas',
    //   icon: <FiCode />, // <canvas> element
    // },
    // {
    //   segment: 'svg',
    //   title: 'SVG',
    //   icon: <FiCode />, // <svg> element
    // },
    // {
    //   kind: 'header',
    //   title: 'Table Elements',
    // },
    // {
    //   segment: 'table',
    //   title: 'Table',
    //   icon: <RiTableLine />,
    //   children: [
    //     {
    //       segment: 'thead',
    //       title: 'Table Head',
    //       icon: <MdTableRows />,
    //     },
    //     {
    //       segment: 'tbody',
    //       title: 'Table Body',
    //       icon: <MdTableRows />,
    //     },
    //     {
    //       segment: 'tr',
    //       title: 'Table Row',
    //       icon: <MdTableRows />,
    //     },
    //     {
    //       segment: 'td',
    //       title: 'Table Data',
    //       icon: <MdTableRows />,
    //     },
    //     {
    //       segment: 'th',
    //       title: 'Table Header',
    //       icon: <MdTableRows />,
    //     },
    //   ],
    // },
    // {
    //   kind: 'header',
    //   title: 'Form Elements',
    // },
    // {
    //   segment: 'form',
    //   title: 'Form',
    //   icon: <AiOutlineForm />,
    //   children: [
    //     {
    //       segment: 'input',
    //       title: 'Input',
    //       icon: <IoTextOutline />,
    //     },
    //     {
    //       segment: 'textarea',
    //       title: 'Textarea',
    //       icon: <FiEdit />,
    //     },
    //     {
    //       segment: 'button',
    //       title: 'Button',
    //       icon: <FiBox />,
    //     },
    //     {
    //       segment: 'select',
    //       title: 'Select',
    //       icon: <FiList />,
    //     },
    //     {
    //       segment: 'option',
    //       title: 'Option',
    //       icon: <FiList />,
    //     },
    //     {
    //       segment: 'label',
    //       title: 'Label',
    //       icon: <FiFileText />,
    //     },
    //   ],
    // },
  ];
  