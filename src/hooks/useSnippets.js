import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export function useSnippets() {
  const [snippets, setSnippets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSnippets();
  }, []);

  const fetchSnippets = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('snippets')
        .select('*')
        .order('createdAt', { ascending: false });

      if (error) {
        throw error;
      }
      
      setSnippets(data || []);
    } catch (error) {
      console.error('Failed to load snippets from Supabase', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addSnippet = async (snippet) => {
    try {
      const newSnippet = {
        id: snippet.id,
        title: snippet.title,
        language: snippet.language,
        code: snippet.code,
        createdAt: new Date().toISOString()
      };

      // Optimistic update
      setSnippets((prev) => [newSnippet, ...prev]);

      const { error } = await supabase
        .from('snippets')
        .insert([newSnippet]);

      if (error) throw error;
      
    } catch (error) {
      console.error('Error adding snippet:', error);
      // Optional: rollback on error by re-fetching snippets or removing from state
      fetchSnippets();
    }
  };

  const updateSnippet = async (id, updatedFields) => {
    try {
      // Optimistic update
      setSnippets((prev) => 
        prev.map((snippet) => snippet.id === id ? { ...snippet, ...updatedFields } : snippet)
      );

      const { error } = await supabase
        .from('snippets')
        .update(updatedFields)
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating snippet:', error);
      fetchSnippets();
    }
  };

  const deleteSnippet = async (id) => {
    try {
      // Optimistic update
      setSnippets((prev) => prev.filter((snippet) => snippet.id !== id));

      const { error } = await supabase
        .from('snippets')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting snippet:', error);
      fetchSnippets();
    }
  };

  return { snippets, isLoading, addSnippet, updateSnippet, deleteSnippet };
}
