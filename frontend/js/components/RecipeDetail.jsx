// ============================================================
// components/RecipeDetail.jsx
// ============================================================
// Componente para exibir detalhes completos de uma receita.
// Mostra ingredientes, modo de preparo e opções de edição/exclusão.
//

import React from 'react';

const THEME = {
  doces:    { bg: '#F4D9A6', bar: '#E3A730' },
  salgados: { bg: '#CFDAC4', bar: '#4B6B3C' },
  bebidas:  { bg: '#E9C0B4', bar: '#C1452D' },
  rapidas:  { bg: '#D8D3C6', bar: '#22261B' }
};

function RecipeDetail({ receita, onEditar, onDeletar, onVoltar }) {
  const tema = THEME[receita.categoria] || THEME.rapidas;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Botão de voltar */}
      <button
        onClick={onVoltar}
        className="mb-6 px-4 py-2 bg-charcoal text-parchment rounded-full hover:bg-opacity-80 transition flex items-center gap-2"
      >
        ← Voltar
      </button>

      {/* Container principal */}
      <div className="rounded-lg overflow-hidden shadow-lg" style={{ backgroundColor: tema.bg }}>
        {/* Imagem */}
        {receita.imagem_url && (
          <div className="w-full h-96 overflow-hidden">
            <img
              src={receita.imagem_url}
              alt={receita.nome}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Conteúdo */}
        <div className="p-8">
          {/* Header com título e ações */}
          <div className="flex items-start justify-between mb-6 pb-6 border-b-2 border-charcoal/20">
            <div>
              <h1 className="font-display text-4xl font-700 text-charcoal mb-2">
                {receita.nome}
              </h1>
              {receita.resumo && (
                <p className="text-lg text-charcoal/70">
                  {receita.resumo}
                </p>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={onEditar}
                className="px-6 py-2 bg-turmeric text-charcoal font-600 rounded-full hover:bg-opacity-90 transition"
              >
                Editar
              </button>
              <button
                onClick={onDeletar}
                className="px-6 py-2 bg-paprika text-white font-600 rounded-full hover:bg-opacity-90 transition"
              >
                Deletar
              </button>
            </div>
          </div>

          {/* Info rápida */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 pb-8 border-b-2 border-charcoal/20">
            {receita.tempo && (
              <div>
                <p className="text-sm text-charcoal/60 font-600">TEMPO</p>
                <p className="text-xl font-600 text-charcoal">{receita.tempo}</p>
              </div>
            )}
            {receita.porcoes && (
              <div>
                <p className="text-sm text-charcoal/60 font-600">PORÇÕES</p>
                <p className="text-xl font-600 text-charcoal">{receita.porcoes}</p>
              </div>
            )}
            {receita.dificuldade !== undefined && (
              <div>
                <p className="text-sm text-charcoal/60 font-600">DIFICULDADE</p>
                <p className="text-xl">{'★'.repeat(receita.dificuldade)}{'☆'.repeat(5 - receita.dificuldade)}</p>
              </div>
            )}
            {receita.categoria && (
              <div>
                <p className="text-sm text-charcoal/60 font-600">CATEGORIA</p>
                <p className="text-xl font-600 text-charcoal capitalize">{receita.categoria}</p>
              </div>
            )}
          </div>

          {/* Ingredientes */}
          {receita.ingredientes && receita.ingredientes.length > 0 && (
            <div className="mb-8 pb-8 border-b-2 border-charcoal/20">
              <h2 className="font-display text-2xl font-600 text-charcoal mb-4">
                Ingredientes
              </h2>
              <ul className="space-y-2">
                {receita.ingredientes.map((ingrediente, idx) => {
                  const [quantidade, nome] = Array.isArray(ingrediente)
                    ? ingrediente
                    : [ingrediente, ''];
                  return (
                    <li key={idx} className="flex items-start gap-3 text-charcoal">
                      <span className="text-xl mt-1">✓</span>
                      <div>
                        {Array.isArray(ingrediente) ? (
                          <>
                            <span className="font-600">{quantidade}</span>
                            <span> {nome}</span>
                          </>
                        ) : (
                          <span>{ingrediente}</span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Modo de preparo */}
          {receita.passos && receita.passos.length > 0 && (
            <div>
              <h2 className="font-display text-2xl font-600 text-charcoal mb-4">
                Modo de Preparo
              </h2>
              <ol className="space-y-4">
                {receita.passos.map((passo, idx) => (
                  <li key={idx} className="flex gap-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full font-stamp font-700 flex-shrink-0 text-ink" style={{ backgroundColor: tema.bar, color: 'white' }}>
                      {idx + 1}
                    </span>
                    <p className="text-charcoal pt-1">{passo}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Metadata */}
          <div className="mt-8 pt-6 border-t border-charcoal/20 text-xs text-charcoal/50">
            {receita.created_at && (
              <p>Criada em: {new Date(receita.created_at).toLocaleDateString('pt-BR')}</p>
            )}
            {receita.updated_at && (
              <p>Última atualização: {new Date(receita.updated_at).toLocaleDateString('pt-BR')}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
