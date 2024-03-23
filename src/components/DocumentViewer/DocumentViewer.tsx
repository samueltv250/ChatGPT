import React from 'react';
interface DocumentViewerProps {
  content: string;
  onClose: () => void;  // Define the type for onClose as a function that returns void
}

function DocumentViewer({ content, onClose}: DocumentViewerProps) {
  // Decode Unicode escape sequences and remove specific double quotes
  const decodeAndCleanContent = (str: string) => {
    // Decode Unicode escape sequences
    let decoded = str.replace(/\\u[\dA-F]{4}/gi, (match) => {
      return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
    });

    // Remove escaped double quotes and trim double quotes at the start and end
    decoded = decoded.replace(/\\"/g, '');
    decoded = decoded.replace(/^"|"$/g, '');

    return decoded;
  };

  const cleanedContent = decodeAndCleanContent(content);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        position: 'relative',
        width: '80%',
        maxHeight: '90vh',
        overflowY: 'auto',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
        lineHeight: '1.6',
        color: '#333',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          fontSize: '24px',
          lineHeight: '24px',
          color: '#ff0000',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
        }}>
          &times;
        </button>
        <div dangerouslySetInnerHTML={{ __html: cleanedContent }} />
      </div>
    </div>
  );
}

export default DocumentViewer;
