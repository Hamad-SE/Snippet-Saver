import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Edit2, Trash2, Copy, Check, ArrowLeft } from 'lucide-react';

export default function SnippetViewer({ snippet, onEdit, onDelete, onBack }) {
  const [copied, setCopied] = useState(false);

  if (!snippet) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="main-content">
      {/* Top Header */}
      <div className="view-header">
        <div className="view-title-group">
          <button className="btn btn-icon mobile-back-btn" onClick={onBack}>
            <ArrowLeft size={20} />
          </button>
          <h1 className="view-title">{snippet.title}</h1>
          <span className={`badge lang-${snippet.language}`}>
            {snippet.language}
          </span>
        </div>
        
        <div className="view-actions">
          <button className="btn btn-secondary" onClick={onEdit}>
            <Edit2 size={16} /> Edit
          </button>
          <button className="btn btn-danger" onClick={() => onDelete(snippet.id)}>
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </div>

      {/* Code Viewer Body */}
      <div className="view-body">
        <div className="view-container">
          <div className="syntax-wrapper">
            
            {/* Mac-like Window Header */}
            <div className="syntax-header">
              <div className="window-controls">
                <div className="dot red"></div>
                <div className="dot yellow"></div>
                <div className="dot green"></div>
              </div>
              
              <div className="lang-label">
                {snippet.language}
              </div>

              <button 
                className={`copy-btn ${copied ? 'copied' : ''}`}
                onClick={handleCopy}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            {/* Code Highlighter */}
            <SyntaxHighlighter
              language={snippet.language}
              style={vscDarkPlus}
              showLineNumbers={true}
              customStyle={{
                margin: 0,
                padding: '24px 16px',
                background: 'transparent',
                fontSize: '14px',
                fontFamily: 'var(--font-mono)',
              }}
              lineNumberStyle={{
                minWidth: '40px',
                paddingRight: '16px',
                color: 'var(--text-muted)',
                textAlign: 'right',
                opacity: 0.5
              }}
            >
              {snippet.code}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </div>
  );
}
