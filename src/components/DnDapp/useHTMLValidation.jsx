// useHTMLValidation.js
import { useCallback } from 'react';

const nodeMaxCounts = {
  containers: 2,
  rows: 1,
  columns: 1,
  metadatas: 1,
  meta: 1,
  link: 1,
  style: 1,
  script: 1,
  noscript: 1,
  base: 1,
  div: 1,
  header: 2,
  footer: 2,
  main: 1,
  section: 2,
  article: 1,
  aside: 1,
  nav: 1,
  navigation: 1, // Alternatif isim eklenebilir
  image: 1,
  audio: 1,
  video: 1,
  canvas: 1,
  svg: 1,
  table: 1,
  caption: 1,
  colgroup: 1,
  col: 1,
  thead: 1,
  tbody: 1,
  tfoot: 1,
  "table-head": 1, // Alternatif kullanım
  "table-body": 1, // Alternatif kullanım
  "table-row": 1,
  tr: 1,
  "table-data": 1,
  td: 1,
  "table-header": 1,
  th: 1,
  form: 1,
  fieldset: 1,
  legend: 1,
  datalist: 1,
  output: 1,
  input: 1,
  textarea: 1,
  button: 1,
  select: 1,
  option: 1,
  optgroup: 1,
  label: 1,
  ul: 1,
  ol: 1,
  li: 1,
  a: 1,
  span: 1,
  paragraph: 1,
  small: 1,
  source: 1,
  track: 1
};


const allowedConnections = {
  body: ['header', 'section', 'footer'],
  containers: ['div',  'section', 'aside'],
  rows: ['columns'],
  header: ['div', 'navigation', 'image', 'form'],
  footer: ['div', 'navigation', 'form'],
  section: ['article', 'aside', 'div', 'form', 'table', "containers", "rows", "columns"],
  article: ['div', 'image', 'audio', 'video'],
  aside: ['div', 'navigation'],
  navigation: ['div', 'button', 'link'],
  table: ['table-head', 'table-body'],
  'table-head': ['table-row'],
  'table-body': ['table-row'],
  'table-row': ['table-data', 'table-header'],
  form: ['input', 'textarea', 'button', 'select', 'label'],
  select: ['option'],
  div: ['div', 'image', 'audio', 'video', 'canvas', 'svg', 'form', 'button', , "containers", "rows", "columns"]
};

const useHTMLValidation = (nodes, edges) => {
  const getNodeTypeCount = useCallback((nodeType) => {
    return nodes.filter(node => node.typeOf === nodeType.toLowerCase()).length;
  }, [nodes]);

  const isValidConnection = useCallback((params) => {
    const sourceNode = nodes.find(node => node.id === params.source);
    const targetNode = nodes.find(node => node.id === params.target);

    if (!sourceNode || !targetNode) return false;

    const hasParent = edges.some(edge => edge.target === params.target);
    if (hasParent) {
      console.warn(`Node with ID ${params.target} already has a parent.`);
      return false;
    }

    const targetType = targetNode.typeOf.toLowerCase();
    const sourceType = sourceNode.typeOf.toLowerCase();

    if (!allowedConnections[sourceType]?.includes(targetType)) {
      console.warn(`${targetType} is not allowed as a child of ${sourceType}.`);
      return false;
    }

    return true;
  }, [nodes, edges]);

  const isValidNewNode = useCallback((nodeType) => {
    const currentCount = getNodeTypeCount(nodeType.toLowerCase());
    return currentCount < (nodeMaxCounts[nodeType.toLowerCase()] || 0);
  }, [getNodeTypeCount]);

  return { isValidConnection, isValidNewNode };
};

export default useHTMLValidation;
