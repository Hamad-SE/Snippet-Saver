import React, { useState } from 'react';
import { useSnippets } from './hooks/useSnippets';
import Sidebar from './components/Sidebar';
import SnippetEditor from './components/SnippetEditor';
import SnippetViewer from './components/SnippetViewer';
import { TerminalSquare, ArrowLeft } from 'lucide-react';
import './App.css';

function App() {
  const { snippets, isLoading, addSnippet, updateSnippet, deleteSnippet } = useSnippets();
  
  const [currentId, setCurrentId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const activeSnippet = currentId ? snippets.find(s => s.id === currentId) : null;

  const handleSave = (idOrSnippet, data) => {
    if (isCreating) {
      addSnippet(idOrSnippet); // passed as full snippet obj
      setCurrentId(idOrSnippet.id);
      setIsCreating(false);
    } else {
      updateSnippet(idOrSnippet, data);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    if (isCreating) {
      setIsCreating(false);
      // fallback to the first snippet if exists
      if (snippets.length > 0) {
        setCurrentId(snippets[0].id);
      }
    } else {
      setIsEditing(false);
    }
  };

  const handleBack = () => {
    setCurrentId(null);
    setIsCreating(false);
    setIsEditing(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this snippet?')) {
      deleteSnippet(id);
      setCurrentId(null);
      
      const remaining = snippets.filter(s => s.id !== id);
      if (remaining.length > 0) {
        setCurrentId(remaining[0].id);
      }
    }
  };

  const isDetailView = activeSnippet || isCreating || isEditing;

  return (
    <div className={`app-container ${isDetailView ? 'detail-active' : 'list-active'}`}>
      <Sidebar 
        snippets={snippets} 
        currentId={currentId}
        setCurrentId={(id) => {
          setCurrentId(id);
          setIsEditing(false);
        }}
        setIsCreating={(val) => {
          setIsCreating(val);
          setIsEditing(false);
        }}
      />
      
      <main className="main-content">
        {(isCreating || isEditing) ? (
          <SnippetEditor 
            snippet={activeSnippet} 
            isCreating={isCreating}
            onSave={handleSave}
            onCancel={handleCancel}
            onBack={handleBack}
          />
        ) : activeSnippet ? (
          <SnippetViewer 
            snippet={activeSnippet} 
            onEdit={() => setIsEditing(true)}
            onDelete={handleDelete}
            onBack={handleBack}
          />
        ) : (
          <div className="placeholder-view">
            <TerminalSquare className="placeholder-icon" />
            <div style={{ textAlign: 'center' }}>
              <h2>Welcome to SnippetSaver</h2>
              {isLoading ? (
                <p style={{ marginTop: '8px' }}>Loading snippets from cloud...</p>
              ) : (
                <p style={{ marginTop: '8px' }}>Select a snippet from the sidebar or create a new one.</p>
              )}
            </div>
            {!isLoading && snippets.length === 0 && (
              <button className="btn btn-primary" onClick={() => setIsCreating(true)}>
                Create Your First Snippet
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
