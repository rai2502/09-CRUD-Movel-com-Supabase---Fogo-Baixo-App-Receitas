// ============================================================
// components/Header.jsx
// ============================================================
// Componente de cabeçalho com logo, título e botão de ação.
//

import React from 'react';

function Header({ onAdicionarClick }) {
  return (
    <header className="bg-ink text-parchment relative overflow-hidden">
      <div className="grain"></div>

      <nav className="relative z-10 max-w-6xl mx-auto flex items-center justify-between px-5 py-5">
        <a href="#" className="flex items-center gap-3">
          <span className="dial" aria-hidden="true">
            <svg viewBox="0 0 60 60" width="34" height="34">
              <circle cx="30" cy="30" r="27" fill="none" stroke="#E3A730" stroke-width="2.5"/>
              <circle cx="30" cy="30" r="20" fill="none" stroke="#E3A730" stroke-width="1.5"/>
              <line x1="30" y1="4" x2="30" y2="10" stroke="#E3A730" stroke-width="2.5" stroke-linecap="round"/>
              <line x1="30" y1="15" x2="30" y2="18" stroke="#E3A730" stroke-width="1.5" stroke-linecap="round"/>
              <line x1="30" y1="30" x2="30" y2="45" stroke="#E3A730" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
          </span>
          <span className="font-display text-2xl font-600">Fogo Baixo</span>
        </a>

        <button
          onClick={onAdicionarClick}
          className="px-6 py-2 bg-turmeric text-ink font-600 rounded-full hover:bg-opacity-90 transition-all"
        >
          + Adicionar Receita
        </button>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-5 py-12 text-center">
        <h1 className="font-display text-5xl font-700 mb-4">
          Receitas com Alma
        </h1>
        <p className="text-xl opacity-90">
          Gerencie suas receitas favoritas em qualquer lugar
        </p>
      </div>
    </header>
  );
}

export default Header;
