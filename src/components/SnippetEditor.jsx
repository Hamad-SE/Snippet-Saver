import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Save, X } from 'lucide-react';

export default function SnippetEditor({ 
  snippet, 
  onSave, 
  onCancel,
  isCreating 
}) {
  const [formData, setFormData] = useState({
    title: '',
    language: 'javascript',
    code: ''
  });

  useEffect(() => {
    if (snippet && !isCreating) {
      setFormData({
        title: snippet.title || '',
        language: snippet.language || 'javascript',
        code: snippet.code || ''
      });
    } else {
      setFormData({
        title: '',
        language: 'javascript',
        code: ''
      });
    }
  }, [snippet, isCreating]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.code.trim()) return;

    if (isCreating) {
      onSave({
        id: uuidv4(),
        ...formData
      });
    } else {
      onSave(snippet.id, formData);
    }
  };

  return (
    <div className="view-container">
      <div className="view-body" style={{ padding: '0' }}>
        <form className="editor-form" onSubmit={handleSubmit}>
          
          <h2 style={{ fontSize: '24px', fontWeight: '600' }}>
            {isCreating ? 'Create New Snippet' : 'Edit Snippet'}
          </h2>

          <div className="form-row">
            <div className="form-group" style={{ flex: 2 }}>
              <label className="label">Title</label>
              <input 
                type="text" 
                name="title"
                className="input" 
                placeholder="e.g. Center a Div CSS"
                value={formData.title}
                onChange={handleChange}
                autoFocus
                required
              />
            </div>

            <div className="form-group" style={{ flex: 1 }}>
              <label className="label">Language</label>
              <select 
                name="language"
                className="select"
                value={formData.language}
                onChange={handleChange}
              >
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="json">JSON</option>
                <option value="bash">Bash</option>
                <option value="markdown">Markdown</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="label">Code Content</label>
            <textarea 
              name="code"
              className="textarea" 
              placeholder="Paste your code here..."
              value={formData.code}
              onChange={handleChange}
              spellCheck="false"
              required
            ></textarea>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={onCancel}
            >
              <X size={16} /> Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
            >
              <Save size={16} /> Save Snippet
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
