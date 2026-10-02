"""
===================================================================
Fogo Baixo — Dados de Exemplo para Testes
===================================================================

Este script Python insere receitas de exemplo no Supabase.
Útil para testar a interface sem criar tudo manualmente.

Requisitos:
    pip install supabase

Uso:
    python seed_data.py
"""

from supabase import create_client
import json

# ============================================================
# CONFIGURAÇÃO
# ============================================================
# Copie aqui as suas credenciais (ou passe como variáveis de ambiente)
SUPABASE_URL = "https://seu-projeto.supabase.co"
SUPABASE_KEY = "sua-chave-publica-aqui"

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# ============================================================
# DADOS DE EXEMPLO
# ============================================================
RECEITAS_EXEMPLO = [
    {
        "nome": "Brigadeiro Gourmet",
        "resumo": "O clássico de festa, na versão com casquinha crocante e recheio macio.",
        "imagem_url": "https://images.unsplash.com/photo-1535920527894-b2fb9e0d9d8f?w=400",
        "categoria": "doces",
        "tempo": "20 min",
        "porcoes": "20 unid.",
        "dificuldade": 1,
        "ingredientes": json.dumps([
            ["1 lata", "leite condensado"],
            ["1 col. sopa", "manteiga sem sal"],
            ["3 col. sopa", "chocolate em pó 50%"],
            ["1 pitada", "sal"],
            ["q.b.", "granulado para enrolar"]
        ]),
        "passos": json.dumps([
            "Misture o leite condensado, a manteiga, o chocolate e o sal numa panela em fogo baixo.",
            "Mexa sem parar até a mistura desgrudar do fundo da panela, por cerca de 8 a 10 minutos.",
            "Transfira para um prato untado e deixe esfriar por 1 hora.",
            "Unte as mãos, enrole bolinhas e passe no granulado."
        ])
    },
    {
        "nome": "Bolo de Chocolate Simples",
        "resumo": "Um bolo fácil e delicioso para toda ocasião.",
        "imagem_url": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400",
        "categoria": "doces",
        "tempo": "40 min",
        "porcoes": "8 pedaços",
        "dificuldade": 2,
        "ingredientes": json.dumps([
            ["2 xícaras", "farinha de trigo"],
            ["1 xícara", "açúcar"],
            ["3 col. sopa", "chocolate em pó"],
            ["2", "ovos"],
            ["1 xícara", "leite"],
            ["1/2 xícara", "óleo"]
        ]),
        "passos": json.dumps([
            "Pré-aqueça o forno a 180°C.",
            "Misture os ingredientes secos em uma tigela.",
            "Em outra tigela, bata os ovos com o açúcar.",
            "Combine os ingredientes úmidos com os secos.",
            "Despeje na forma e leve ao forno por 30 minutos."
        ])
    },
    {
        "nome": "Pão de Queijo",
        "resumo": "Quitanda mineira classicã que não pode faltar.",
        "imagem_url": "https://images.unsplash.com/photo-1574080556131-31dcc3fb588c?w=400",
        "categoria": "salgados",
        "tempo": "25 min",
        "porcoes": "12 unidades",
        "dificuldade": 2,
        "ingredientes": json.dumps([
            ["1 xícara", "leite"],
            ["1/2 xícara", "óleo"],
            ["2", "ovos"],
            ["2 xícaras", "povilho azedo"],
            ["1 xícara", "queijo meia cura ralado"],
            ["sal e pimenta", "a gosto"]
        ]),
        "passos": json.dumps([
            "Aqueça o forno a 200°C.",
            "Em uma tigela, misture leite, óleo e ovos.",
            "Adicione o povilho, queijo, sal e pimenta.",
            "Mexa bem até formar uma massa homogênea.",
            "Digite em forminhas untadas.",
            "Asse por 25 minutos até dourar."
        ])
    },
    {
        "nome": "Suco Natural de Frutas Vermelhas",
        "resumo": "Bebida refrescante e nutritiva perfeita para o calor.",
        "imagem_url": "https://images.unsplash.com/photo-1600271886742-f049cd1f3033?w=400",
        "categoria": "bebidas",
        "tempo": "5 min",
        "porcoes": "1 litro",
        "dificuldade": 1,
        "ingredientes": json.dumps([
            ["200g", "morango fresco"],
            ["150g", "framboesa"],
            ["100g", "amora"],
            ["2", "maçãs"],
            ["1 litro", "água filtrada"],
            ["2 col. sopa", "mel (opcional)"]
        ]),
        "passos": json.dumps([
            "Higienize todas as frutas.",
            "Coloque as frutas no liquidificador com água.",
            "Bata até ficar homogêneo.",
            "Coe e sirva gelado.",
            "Adicione mel se desejar mais doçura."
        ])
    },
    {
        "nome": "Macarrão Instantâneo Gourmet",
        "resumo": "Transforme o macarrão instantâneo em um prato sofisticado.",
        "imagem_url": "https://images.unsplash.com/photo-1581822261290-991b38693d1b?w=400",
        "categoria": "rapidas",
        "tempo": "10 min",
        "porcoes": "2 porções",
        "dificuldade": 1,
        "ingredientes": json.dumps([
            ["2", "pacotes de macarrão instantâneo"],
            ["1 litro", "água"],
            ["2", "ovos"],
            ["1 xícara", "brócolis picado"],
            ["2 col. sopa", "azeite"],
            ["alho", "a gosto"]
        ]),
        "passos": json.dumps([
            "Cozinhe o macarrão conforme instruções.",
            "Em paralelo, salteie brócolis e alho no azeite.",
            "Cozinhe os ovos.",
            "Distribua o macarrão em tigelas.",
            "Coloque brócolis e ovo por cima.",
            "Regue com o azeite aromatizado."
        ])
    }
]

# ============================================================
# FUNÇÕES
# ============================================================
def seed_database():
    """Insere dados de exemplo no Supabase"""
    print("🌱 Iniciando seed de dados...")
    print(f"🔗 Conectando a {SUPABASE_URL}")
    
    try:
        for index, receita in enumerate(RECEITAS_EXEMPLO, 1):
            print(f"\n📝 Inserindo receita {index}/{len(RECEITAS_EXEMPLO)}: {receita['nome']}")
            
            response = supabase.table('receitas').insert(receita).execute()
            
            if response.data:
                print(f"✅ Receita criada com ID: {response.data[0]['id']}")
            else:
                print(f"❌ Erro ao criar receita")
        
        print("\n" + "="*60)
        print("✨ Seed concluído com sucesso!")
        print("="*60)
        
        # Listar receitas criadas
        result = supabase.table('receitas').select('*').execute()
        print(f"\n📊 Total de receitas no banco: {len(result.data)}")
        
    except Exception as e:
        print(f"❌ Erro: {e}")
        print("\nDica: Verifique suas credenciais em SUPABASE_URL e SUPABASE_KEY")

if __name__ == "__main__":
    seed_database()
