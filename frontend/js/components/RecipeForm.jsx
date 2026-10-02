// ============================================================
// components/RecipeForm.jsx
// ============================================================
// Formulário para criar e editar receitas.
// Campos dinâmicos para ingredientes e passos.
//

import React, { useState } from 'react';

function RecipeForm({ modo = 'criar', receita = null, onSalvar, onCancelar }) {
  const [formData, setFormData] = useState(
    receita || {
      nome: '',
      resumo: '',
      imagem_url: '',
      categoria: 'rapidas',
      tempo: '',
      porcoes: '',
      dificuldade: 1,
      ingredientes: [['', '']],
      passos: ['']
    }
  );

  const [salvando, setSalvando] = useState(false);
  const [erroValidacao, setErroValidacao] = useState('');

  // Validações
  const validar = () => {
    if (!formData.nome.trim()) {
      setErroValidacao('Nome da receita é obrigatório');
      return false;
    }
    if (formData.ingredientes.every(ing => !ing[0] && !ing[1])) {
      setErroValidacao('Adicione pelo menos um ingrediente');
      return false;
    }
    if (formData.passos.every(p => !p.trim())) {
      setErroValidacao('Adicione pelo menos um passo');
      return false;
    }
    setErroValidacao('');
    return true;
  };

  // Manipuladores de mudança
  const handleTabelaChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'dificuldade' ? parseInt(value) : value
    }));
  };

  const handleIngredienteChange = (idx, campo, valor) => {
    const novosIngredientes = [...formData.ingredientes];
    if (campo === 'quantidade') {
      novosIngredientes[idx][0] = valor;
    } else {
      novosIngredientes[idx][1] = valor;
    }
    setFormData(prev => ({
      ...prev,
      ingredientes: novosIngredientes
    }));
  };

  const adicionarIngrediente = () => {
    setFormData(prev => ({
      ...prev,
      ingredientes: [...prev.ingredientes, ['', '']]
    }));
  };

  const removerIngrediente = (idx) => {
    setFormData(prev => ({
      ...prev,
      ingredientes: prev.ingredientes.filter((_, i) => i !== idx)
    }));
  };

  const handlePassoChange = (idx, valor) => {
    const novosPassos = [...formData.passos];
    novosPassos[idx] = valor;
    setFormData(prev => ({
      ...prev,
      passos: novosPassos
    }));
  };

  const adicionarPasso = () => {
    setFormData(prev => ({
      ...prev,
      passos: [...prev.passos, '']
    }));
  };

  const removerPasso = (idx) => {
    setFormData(prev => ({
      ...prev,
      passos: prev.passos.filter((_, i) => i !== idx)
    }));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validar()) return;

    setSalvando(true);
    try {
      // Remove ingredientes e passos vazios
      const dadosLimpos = {
        ...formData,
        ingredientes: formData.ingredientes.filter(ing => ing[0] || ing[1]),
        passos: formData.passos.filter(p => p.trim())
      };

      await onSalvar(dadosLimpos);
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-display text-3xl font-700 text-charcoal mb-8">
        {modo === 'criar' ? '+ Criar Receita' : 'Editar Receita'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg p-8 shadow-lg">
        {/* Erro de validação */}
        {erroValidacao && (
          <div className="p-4 bg-paprika/10 border-l-4 border-paprika text-paprika rounded">
            {erroValidacao}
          </div>
        )}

        {/* Seção 1: Informações Básicas */}
        <div className="space-y-4 pb-6 border-b">
          <h2 className="font-display text-xl font-600 text-charcoal">Informações Básicas</h2>

          <div>
            <label className="block text-sm font-600 text-charcoal mb-2">
              Nome da Receita *
            </label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleTabelaChange}
              placeholder="Ex: Brigadeiro Gourmet"
              className="w-full px-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-turmeric"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-600 text-charcoal mb-2">
              Resumo/Descrição
            </label>
            <textarea
              name="resumo"
              value={formData.resumo}
              onChange={handleTabelaChange}
              placeholder="Descrição breve da receita..."
              rows="3"
              className="w-full px-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-turmeric"
            />
          </div>

          <div>
            <label className="block text-sm font-600 text-charcoal mb-2">
              URL da Imagem
            </label>
            <input
              type="url"
              name="imagem_url"
              value={formData.imagem_url}
              onChange={handleTabelaChange}
              placeholder="https://exemplo.com/imagem.jpg"
              className="w-full px-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-turmeric"
            />
            {formData.imagem_url && (
              <img
                src={formData.imagem_url}
                alt="Preview"
                className="mt-2 max-w-xs h-32 object-cover rounded-lg"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            )}
          </div>
        </div>

        {/* Seção 2: Metadados */}
        <div className="space-y-4 pb-6 border-b">
          <h2 className="font-display text-xl font-600 text-charcoal">Detalhes</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-600 text-charcoal mb-2">
                Categoria *
              </label>
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleTabelaChange}
                className="w-full px-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-turmeric"
              >
                <option value="doces">Doces</option>
                <option value="salgados">Salgados</option>
                <option value="bebidas">Bebidas</option>
                <option value="rapidas">Rápidas</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-600 text-charcoal mb-2">
                Dificuldade (1-5)
              </label>
              <select
                name="dificuldade"
                value={formData.dificuldade}
                onChange={handleTabelaChange}
                className="w-full px-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-turmeric"
              >
                {[1, 2, 3, 4, 5].map(n => (
                  <option key={n} value={n}>{n} - {'★'.repeat(n)}{'☆'.repeat(5-n)}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-600 text-charcoal mb-2">
                Tempo (Ex: 20 min)
              </label>
              <input
                type="text"
                name="tempo"
                value={formData.tempo}
                onChange={handleTabelaChange}
                placeholder="20 min"
                className="w-full px-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-turmeric"
              />
            </div>

            <div>
              <label className="block text-sm font-600 text-charcoal mb-2">
                Porções (Ex: 20 unid.)
              </label>
              <input
                type="text"
                name="porcoes"
                value={formData.porcoes}
                onChange={handleTabelaChange}
                placeholder="20 unid."
                className="w-full px-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-turmeric"
              />
            </div>
          </div>
        </div>

        {/* Seção 3: Ingredientes */}
        <div className="space-y-4 pb-6 border-b">
          <h2 className="font-display text-xl font-600 text-charcoal">Ingredientes *</h2>

          {formData.ingredientes.map((ingrediente, idx) => (
            <div key={idx} className="flex gap-3">
              <input
                type="text"
                value={ingrediente[0]}
                onChange={(e) => handleIngredienteChange(idx, 'quantidade', e.target.value)}
                placeholder="Ex: 1 lata"
                className="flex-1 px-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-turmeric"
              />
              <input
                type="text"
                value={ingrediente[1]}
                onChange={(e) => handleIngredienteChange(idx, 'nome', e.target.value)}
                placeholder="Ex: leite condensado"
                className="flex-2 px-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-turmeric"
              />
              {formData.ingredientes.length > 1 && (
                <button
                  type="button"
                  onClick={() => removerIngrediente(idx)}
                  className="px-3 py-2 bg-paprika text-white rounded-lg hover:bg-opacity-90 transition"
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={adicionarIngrediente}
            className="w-full py-2 border-2 border-dashed border-charcoal/30 rounded-lg text-charcoal hover:bg-charcoal/5 transition"
          >
            + Adicionar Ingrediente
          </button>
        </div>

        {/* Seção 4: Moda de Preparo */}
        <div className="space-y-4">
          <h2 className="font-display text-xl font-600 text-charcoal">Modo de Preparo *</h2>

          {formData.passos.map((passo, idx) => (
            <div key={idx} className="flex gap-3">
              <span className="inline-flex items-center justify-center w-8 h-10 rounded font-stamp font-700 flex-shrink-0 bg-turmeric text-charcoal">
                {idx + 1}
              </span>
              <textarea
                value={passo}
                onChange={(e) => handlePassoChange(idx, e.target.value)}
                placeholder="Descrever o passo..."
                rows="2"
                className="flex-1 px-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-turmeric"
              />
              {formData.passos.length > 1 && (
                <button
                  type="button"
                  onClick={() => removerPasso(idx)}
                  className="px-3 py-2 bg-paprika text-white rounded-lg hover:bg-opacity-90 transition h-10"
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={adicionarPasso}
            className="w-full py-2 border-2 border-dashed border-charcoal/30 rounded-lg text-charcoal hover:bg-charcoal/5 transition"
          >
            + Adicionar Passo
          </button>
        </div>

        {/* Botões de ação */}
        <div className="flex gap-4 pt-6 border-t">
          <button
            type="submit"
            disabled={salvando}
            className="flex-1 py-3 bg-turmeric text-charcoal font-600 rounded-lg hover:bg-opacity-90 transition disabled:opacity-50"
          >
            {salvando ? 'Salvando...' : (modo === 'criar' ? 'Criar Receita' : 'Salvar Alterações')}
          </button>
          <button
            type="button"
            onClick={onCancelar}
            className="flex-1 py-3 bg-charcoal/10 text-charcoal font-600 rounded-lg hover:bg-charcoal/20 transition"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default RecipeForm;
