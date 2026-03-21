# StockView
Um visualizador para consultar o histórico de ações.

## ✨ Funcionalidades
- Busca de ações brasileiras por símbolo (ex: PETR4, IVVB11, VALE3)
- Gráfico interativo de preços com Chart.js

## 🚀 Como usar

1. **Clone este repositório:**
```sh
   git clone https://github.com/seu-usuario/StockView.git
```

2. **Instale as dependências:**
```sh
   npm install
```

3. **Crie o arquivo `.env` na raiz do projeto:**
```sh
   VITE_BRAPI_TOKEN=seu_token_aqui
```
   Obtenha seu token em [brapi.dev/dashboard](https://brapi.dev/dashboard)

4. **Inicie o servidor de desenvolvimento:**
```sh
   npm run dev
```

## 🛠️ Tecnologias
- HTML5
- CSS3
- JavaScript
- [Vite](https://vitejs.dev/)
- [Chart.js](https://www.chartjs.org/)
- [brapi](https://brapi.dev/)

## 📢 Observações
- A API da brapi tem um limite de 15.000 requisições/mês no plano gratuito.

## 📚 Créditos
- Dados fornecidos por [brapi](https://brapi.dev/)
- Gráficos por [Chart.js](https://www.chartjs.org/)