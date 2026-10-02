// ============================================================
// components/RecipesGrid.jsx
// ============================================================
// Grade exibindo todas as receitas de forma visual e interativa.
//

import React from 'react';

// Ícones de categorias
const ICONS = {
  doces: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 10c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M4 10h16l-1.4 9.2a2 2 0 0 1-2 1.8H7.4a2 2 0 0 1-2-1.8L4 10Z"/><path d="M9 14v3M12 14v3M15 14v3"/></svg>`,
  salgados: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11h18"/><path d="M4 11a8 8 0 0 0 16 0"/><path d="M9 11V8a3 3 0 0 1 6 0v3"/><path d="M2 11h1M21 11h1"/></svg>`,
  bebidas: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h10l-1.2 15.4A2 2 0 0 1 13.8 20h-3.6a2 2 0 0 1-2-1.6L7 3Z"/><path d="M6 8h12"/></svg>`,
  rapidas: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"/></svg>`
};

const THEME = {
  doces:    { bg: '#F4D9A6', bar: '#E3A730', icon: '#22261B' },
  salgados: { bg: '#CFDAC4', bar: '#4B6B3C', icon: '#22261B' },
  bebidas:  { bg: '#E9C0B4', bar: '#C1452D', icon: '#22261B' },
  rapidas:  { bg: '#D8D3C6', bar: '#22261B', icon: '#22261B' }
};

function RecipesGrid({ receitas, onRecipiaClick, onAdicionarClick }) {
  if (receitas.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-charcoal mb-6">Nenhuma receita cadastrada ainda</p>
        <button
          onClick={onAdicionarClick}
          className="px-8 py-3 bg-turmeric text-ink font-600 rounded-full hover:bg-opacity-90 transition-all inline-block"
        >
          Criar sua primeira receita
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {receitas.map((receita) => {
        const tema = THEME[receita.categoria] || THEME.rapidas;
        return (
          <div
            key={receita.id}
            onClick={() => onRecipiaClick(receita)}
            className="cursor-pointer transform transition-transform hover:scale-105"
            style={{ backgroundColor: tema.bg }}
          >
            {/* Imagem */}
            <div className="relative w-full h-48 overflow-hidden bg-charcoal/10">
              {receita.imagem_url ? (
                <img
                  src={receita.imagem_url}
                  alt={receita.nome}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl">
                  🍳
                </div>
              )}
            </div>

            {/* Conteúdo */}
            <div className="p-4">
              {/* Categoria e ícone */}
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-8 h-8"
                  dangerouslySetInnerHTML={{ __html: ICONS[receita.categoria] || ICONS.rapidas }}
                  style={{ color: tema.icon }}
                />
                <span className="text-xs font-600 px-2 py-1" style={{ backgroundColor: tema.bar, color: '#fff' }}>
                  {receita.categoria.toUpperCase()}
                </span>
              </div>

              {/* Nome */}
              <h3 className="font-display text-lg font-600 text-charcoal mb-2">
                {receita.nome}
              </h3>

              {/* Resumo */}
              {receita.resumo && (
                <p className="text-sm text-charcoal/70 mb-4 line-clamp-2">
                  {receita.resumo}
                </p>
              )}

              {/* Meta-informações */}
              <div className="flex items-center justify-between text-xs text-charcoal/60 border-t border-charcoal/20 pt-3">
                {receita.tempo && <span>⏱️ {receita.tempo}</span>}
                {receita.porcoes && <span>🍽️ {receita.porcoes}</span>}
                {receita.dificuldade !== undefined && (
                  <span>⭐ {'★'.repeat(receita.dificuldade)}{'☆'.repeat(5 - receita.dificuldade)}</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RecipesGrid;
