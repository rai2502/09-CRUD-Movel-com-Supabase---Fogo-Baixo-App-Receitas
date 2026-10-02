// ============================================================
// hooks/useRecipesCRUD.js
// ============================================================
// Hook customizado para operações CRUD de receitas.
// Centraliza toda a lógica de sincronização com Supabase.
//

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient.js';

// Nome da tabela no Supabase
const TABELA_RECEITAS = 'receitas';

export function useRecipesCRUD() {
  const [receitas, setReceitas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // **READ**: Buscar todas as receitas
  const buscarReceitas = useCallback(async () => {
    try {
      setCarregando(true);
      setErro(null);

      const { data, error } = await supabase
        .from(TABELA_RECEITAS)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setReceitas(data || []);
    } catch (err) {
      console.error('[CRUD] Erro ao buscar receitas:', err);
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }, []);

  // **CREATE**: Adicionar uma nova receita
  const criarReceita = useCallback(async (novaReceita) => {
    try {
      setErro(null);

      const { data, error } = await supabase
        .from(TABELA_RECEITAS)
        .insert([novaReceita])
        .select();

      if (error) throw error;

      // Adiciona à lista local de forma otimista
      if (data && data[0]) {
        setReceitas(prev => [data[0], ...prev]);
      }

      return data?.[0] || null;
    } catch (err) {
      console.error('[CRUD] Erro ao criar receita:', err);
      setErro(err.message);
      throw err;
    }
  }, []);

  // **UPDATE**: Atualizar uma receita existente
  const atualizarReceita = useCallback(async (id, dadosAtualizados) => {
    try {
      setErro(null);

      const { data, error } = await supabase
        .from(TABELA_RECEITAS)
        .update(dadosAtualizados)
        .eq('id', id)
        .select();

      if (error) throw error;

      // Atualiza na lista local
      setReceitas(prev =>
        prev.map(r => r.id === id ? (data[0] || r) : r)
      );

      return data?.[0] || null;
    } catch (err) {
      console.error('[CRUD] Erro ao atualizar receita:', err);
      setErro(err.message);
      throw err;
    }
  }, []);

  // **DELETE**: Deletar uma receita
  const deletarReceita = useCallback(async (id) => {
    try {
      setErro(null);

      const { error } = await supabase
        .from(TABELA_RECEITAS)
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Remove da lista local
      setReceitas(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      console.error('[CRUD] Erro ao deletar receita:', err);
      setErro(err.message);
      throw err;
    }
  }, []);

  // Buscar receitas ao montar o componente
  useEffect(() => {
    buscarReceitas();
  }, [buscarReceitas]);

  // **SINCRONIZAÇÃO EM TEMPO REAL**: Inscrever-se a mudanças
  useEffect(() => {
    const canalAssinatura = supabase
      .channel('receitas-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Todos os eventos: INSERT, UPDATE, DELETE
          schema: 'public',
          table: TABELA_RECEITAS
        },
        (payload) => {
          console.log('[Realtime] Evento recebido:', payload.eventType, payload);

          if (payload.eventType === 'INSERT') {
            // Nova receita adicionada no banco
            setReceitas(prev => {
              // Evita duplicata se foi adicionada localmente na criarReceita
              if (prev.some(r => r.id === payload.new.id)) {
                return prev;
              }
              return [payload.new, ...prev];
            });
          } else if (payload.eventType === 'UPDATE') {
            // Receita atualizada no banco
            setReceitas(prev =>
              prev.map(r => r.id === payload.new.id ? payload.new : r)
            );
          } else if (payload.eventType === 'DELETE') {
            // Receita deletada no banco
            setReceitas(prev => prev.filter(r => r.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    // Cleanup: desinscrever ao desmontar o componente
    return () => {
      supabase.removeChannel(canalAssinatura);
    };
  }, []);

  return {
    receitas,
    carregando,
    erro,
    buscarReceitas,
    criarReceita,
    atualizarReceita,
    deletarReceita
  };
}
