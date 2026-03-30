import React, { useState } from 'react';
import { Search, Plus, TerminalSquare, SearchSlash } from 'lucide-react';

export default function Sidebar({ snippets, currentId, setCurrentId, setIsCreating }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSnippets = snippets.filter(
    (s) =>
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.language.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="brand">
          <TerminalSquare className="brand-icon" size={24} />
          <span>SnippetSaver</span>
        </div>
        
        <button 
          className="btn btn-primary"
          onClick={() => {
            setCurrentId(null);
            setIsCreating(true);
          }}
        >
          <Plus size={16} />
          New Snippet
        </button>

        <div className="search-bar">
          <Search className="search-icon" size={16} />
          <input 
            type="text" 
            placeholder="Search snippets..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="snippet-list">
        {filteredSnippets.length > 0 ? (
          filteredSnippets.map((snippet) => (
            <div 
              key={snippet.id} 
              className={`snippet-item ${currentId === snippet.id ? 'active' : ''}`}
              onClick={() => {
                setCurrentId(snippet.id);
                setIsCreating(false);
              }}
            >
              <div className="item-header">
                <span className="item-title">{snippet.title || 'Untitled Snippet'}</span>
                <span className={`item-lang lang-${snippet.language}`}>
                  {snippet.language === 'javascript' ? 'JS' : 
                   snippet.language === 'python' ? 'PY' :
                   snippet.language.toUpperCase()}
                </span>
              </div>
              <span className="item-date">
                {new Date(snippet.createdAt).toLocaleDateString(undefined, {
                  month: 'short', day: 'numeric', year: 'numeric'
                })}
              </span>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <SearchSlash size={24} />
            <p>No snippets found.</p>
          </div>
        )}
      </div>
    </aside>
  );
}
