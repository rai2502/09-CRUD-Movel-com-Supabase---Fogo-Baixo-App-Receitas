// ============================================================
// App.jsx
// ============================================================
// Componente raiz da aplicação. Gerencia o estado global,
// renderiza a lista de receitas e o formulário de criação/edição.
//

import React, { useState } from 'react';
import { useRecipesCRUD } from './hooks/useRecipesCRUD.js';
import Header from './components/Header.jsx';
import RecipesGrid from './components/RecipesGrid.jsx';
import RecipeForm from './components/RecipeForm.jsx';
import RecipeDetail from './components/RecipeDetail.jsx';
import ErrorNotification from './components/ErrorNotification.jsx';

function App() {
  const { receitas, carregando, erro, criarReceita, atualizarReceita, deletarReceita } = useRecipesCRUD();
  
  // Estado para controlar qual tela está sendo exibida
  const [telaAtual, setTelaAtual] = useState('lista'); // 'lista', 'criar', 'editar', 'detalhe'
  const [receitaSelecionada, setReceitaSelecionada] = useState(null);
  const [erroTemporario, setErroTemporario] = useState(null);

  // Limpar erro após alguns segundos
  React.useEffect(() => {
    if (erroTemporario) {
      const timer = setTimeout(() => setErroTemporario(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [erroTemporario]);

  // Funções para navegação
  const irParaLista = () => {
    setTelaAtual('lista');
    setReceitaSelecionada(null);
  };

  const irParaCriar = () => {
    setTelaAtual('criar');
    setReceitaSelecionada(null);
  };

  const irParaEditar = (receita) => {
    setTelaAtual('editar');
    setReceitaSelecionada(receita);
  };

  const irParaDetalhe = (receita) => {
    setTelaAtual('detalhe');
    setReceitaSelecionada(receita);
  };

  // Manipuladores para operações CRUD
  const handleCriar = async (dados) => {
    try {
      await criarReceita(dados);
      irParaLista();
    } catch (err) {
      setErroTemporario(`Erro ao criar receita: ${err.message}`);
    }
  };

  const handleAtualizar = async (dados) => {
    try {
      await atualizarReceita(receitaSelecionada.id, dados);
      irParaLista();
    } catch (err) {
      setErroTemporario(`Erro ao atualizar receita: ${err.message}`);
    }
  };

  const handleDeletar = async (id) => {
    if (confirm('Tem certeza que deseja deletar esta receita?')) {
      try {
        await deletarReceita(id);
        irParaLista();
      } catch (err) {
        setErroTemporario(`Erro ao deletar receita: ${err.message}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-parchment">
      <Header onAdicionarClick={irParaCriar} />
      
      {/* Notificação de erro */}
      {(erroTemporario || erro) && (
        <ErrorNotification
          mensagem={erroTemporario || erro}
          onFechar={() => {
            setErroTemporario(null);
          }}
        />
      )}

      {/* Indicador de carregamento inicial */}
      {carregando && telaAtual === 'lista' && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-turmeric"></div>
            <p className="mt-4 text-ink">Carregando receitas...</p>
          </div>
        </div>
      )}

      {/* Telas principais */}
      <main className="max-w-6xl mx-auto px-5 py-8">
        {telaAtual === 'lista' && !carregando && (
          <RecipesGrid
            receitas={receitas}
            onRecipiaClick={irParaDetalhe}
            onAdicionarClick={irParaCriar}
          />
        )}

        {telaAtual === 'criar' && (
          <RecipeForm
            modo="criar"
            onSalvar={handleCriar}
            onCancelar={irParaLista}
          />
        )}

        {telaAtual === 'editar' && receitaSelecionada && (
          <RecipeForm
            modo="editar"
            receita={receitaSelecionada}
            onSalvar={handleAtualizar}
            onCancelar={irParaLista}
          />
        )}

        {telaAtual === 'detalhe' && receitaSelecionada && (
          <RecipeDetail
            receita={receitaSelecionada}
            onEditar={() => irParaEditar(receitaSelecionada)}
            onDeletar={() => handleDeletar(receitaSelecionada.id)}
            onVoltar={irParaLista}
          />
        )}
      </main>
    </div>
  );
}

export default App;
