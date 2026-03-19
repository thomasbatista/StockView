const apiKey = import.meta.env.VITE_BRAPI_TOKEN;

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const stockSymbolInput = document.getElementById('stockSymbol');
    let stockChart;

    const fetchData = async () => {
        const stockSymbol = stockSymbolInput.value.trim().toUpperCase();

        if (!stockSymbol) {
            alert('Por favor, digite um símbolo de ação.');
            return;
        }

        const apiUrl = `https://brapi.dev/api/quote/${stockSymbol}?range=3mo&interval=1d&token=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.error) {
                alert(`Erro: ${data.message || 'Símbolo não encontrado.'}`);
                return;
            }

            const result = data.results?.[0];
            const historical = result?.historicalDataPrice;

            if (!historical || historical.length === 0) {
                alert('Não foi possível obter os dados históricos para este símbolo.');
                return;
            }

            const dates = historical.map(entry => {
                const d = new Date(entry.date * 1000);
                return d.toLocaleDateString('pt-BR');
            });

            const closingPrices = historical.map(entry => entry.close);

            renderChart(dates, closingPrices, stockSymbol);

        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            alert('Ocorreu um erro ao conectar com a API. Verifique sua conexão ou tente novamente mais tarde.');
        }
    };

    const renderChart = (labels, data, symbol) => {
        const ctx = document.getElementById('stockChart').getContext('2d');

        if (stockChart) {
            stockChart.destroy();
        }

        stockChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: `Preço de ${symbol}`,
                    data: data,
                    borderColor: '#3949ab',
                    backgroundColor: 'rgba(57, 73, 171, 0.1)',
                    borderWidth: 2,
                    pointRadius: 2,
                    pointBackgroundColor: '#5d68b2ff',
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: { display: true, text: 'Data' }
                    },
                    y: {
                        title: { display: true, text: 'Preço (BRL)' },
                        ticks: {
                            callback: (value) => 'R$ ' + value.toFixed(2)
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                }
            }
        });
    };

    searchButton.addEventListener('click', fetchData);

    stockSymbolInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') fetchData();
    });
});