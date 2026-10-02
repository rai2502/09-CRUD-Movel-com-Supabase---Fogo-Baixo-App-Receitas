// ============================================================
// components/ErrorNotification.jsx
// ============================================================
// Componente para exibir mensagens de erro.
//

import React from 'react';

function ErrorNotification({ mensagem, onFechar }) {
  return (
    <div className="fixed top-4 right-4 left-4 z-50 bg-paprika text-white p-4 rounded-lg shadow-lg flex items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
        <div>
          <h3 className="font-600">Erro</h3>
          <p className="text-sm opacity-90">{mensagem}</p>
        </div>
      </div>
      <button
        onClick={onFechar}
        className="flex-shrink-0 text-white hover:opacity-75 transition"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}

export default ErrorNotification;
