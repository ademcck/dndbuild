import React, { useState, useMemo } from 'react';
import './NodeSelector.css';



// HTML elementleri ve izin verilen child'ları
const htmlElements = {
  body: ["header", "section" , "footer"],
  containers: ["div", "section", "aside"],
  columns: ["div", "section", "aside"],
  rows: ["div", "section", "aside"],
  div: ['div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'img', 'button', 'form', 'a', 'section', 'nav', 'article', 'aside'],
  section: ['div', 'article', 'aside', 'nav', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'form'],
  article: ['div', 'header', 'footer', 'p', 'section', 'aside'],
  aside: ['div', 'nav', 'section', 'p'],
  header: ['div', 'nav', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'form', 'img'],
  footer: ['div', 'nav', 'p', 'form'],
  nav: ['ul', 'div', 'a', 'button', 'li'],
  main: ['div', 'section', 'article', 'aside'],
  p: ['span', 'a', 'strong', 'em', 'img'],
  h1: ['span', 'small', 'a'],
  h2: ['span', 'small', 'a'],
  h3: ['span', 'small', 'a'],
  h4: ['span', 'small', 'a'],
  h5: ['span', 'small', 'a'],
  h6: ['span', 'small', 'a'],
  span: ['strong', 'em', 'a'],
  form: ['input', 'textarea', 'select', 'button', 'label', 'fieldset', 'div'],
  fieldset: ['legend', 'input', 'textarea', 'select', 'button', 'label'],
  label: ['input', 'select', 'textarea'],
  ul: ['li'],
  ol: ['li'],
  li: ['ul', 'ol', 'div', 'p', 'span', 'a'],
  table: ['thead', 'tbody', 'tfoot', 'tr'],
  thead: ['tr'],
  tbody: ['tr'],
  tfoot: ['tr'],
  tr: ['th', 'td'],
  th: ['div', 'p', 'span', 'a'],
  td: ['div', 'p', 'span', 'a'],
  figure: ['img', 'figcaption', 'video', 'audio'],
  picture: ['source', 'img'],
  details: ['summary', 'div', 'p'],
  dialog: ['div', 'form', 'p'],
  a: ['span', 'strong', 'em', 'img', 'div', 'p'],
  button: ['span', 'strong', 'em', 'img'],
  video: ['source', 'track'],
  audio: ['source']
};
const NodeSelector = ({ isVisible, onSelect, onCancel, sourceNodeLabel }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Source node tipine göre kullanılabilir elementleri belirle
  const availableOptions = useMemo(() => {
    if (!sourceNodeLabel) return [];

    // Source node'un tipini belirle
    const sourceType = sourceNodeLabel.toLowerCase();

    // HTML elementi ise izin verilen child'ları döndür
    return htmlElements[sourceType] || [];
  }, [sourceNodeLabel]);

  // Arama terimine göre filtreleme yap
  const filteredOptions = availableOptions.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Seçenekleri kategorilere ayır
  const categorizedOptions = useMemo(() => {
    const categories = {
      body: ['header', 'section', 'footer'],
      layout: ['div', 'section', 'article', 'aside',  'nav', 'main'],
      content: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'a'],
      form: ['form', 'input', 'textarea', 'select', 'button', 'label', 'fieldset'],
      lists: ['ul', 'ol', 'li', 'a'],
      table: ['table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td'],
      media: ['figure', 'img', 'video', 'audio', 'picture'],
      interactive: ['details', 'dialog', 'button'],
    };

    return Object.entries(categories).reduce((acc, [category, elements]) => {
      const categoryElements = filteredOptions.filter(opt => elements.includes(opt));
      if (categoryElements.length > 0) {
        acc[category] = categoryElements;
      }
      return acc;
    }, {});
  }, [filteredOptions]);

  if (!isVisible) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <input
          type="text"
          placeholder="Search elements..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        
        <div className="categories">
          {Object.entries(categorizedOptions).map(([category, elements]) => (
            elements.length > 0 && (
              <div key={category} className="category">
                <h3 className="category-title">{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                <ul className="element-list">
                  {elements.map(element => (
                    <li 
                      key={element} 
                      onClick={() => onSelect(element)}
                      className="element-item"
                    >
                      {element}
                    </li>
                  ))}
                </ul>
              </div>
            )
          ))}
        </div>
        
        <button onClick={onCancel} className="cancel-button">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NodeSelector;