const apiKey = 'RCSKM0URHG6LGKM4'; 

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const stockSymbolInput = document.getElementById('stockSymbol');
    let stockChart; 

    // Função para buscar e exibir os dados
    const fetchData = async () => {
        const stockSymbol = stockSymbolInput.value.trim().toUpperCase();

        if (!stockSymbol) {
            alert('Por favor, digite um símbolo de ação.');
            return;
        }

        const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&apikey=${apiKey}&outputsize=compact`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data['Error Message']) {
                alert('Erro: Símbolo da ação não encontrado ou inválido.');
                return;
            }
            
            if (data['Note']) {
                 alert('A API da Alpha Vantage tem um limite de 25 requisições por dia. Tente novamente mais tarde.');
                 return;
            }

            const timeSeries = data['Time Series (Daily)'];
            if (!timeSeries) {
                alert('Não foi possível obter os dados para este símbolo.');
                return;
            }
            
            const dates = Object.keys(timeSeries).slice(0, 100).reverse();
            const closingPrices = dates.map(date => parseFloat(timeSeries[date]['4. close']));
            
            renderChart(dates, closingPrices, stockSymbol);

        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            alert('Ocorreu um erro ao conectar com a API. Verifique sua conexão ou tente novamente mais tarde.');
        }
    };
    
    // Função para renderizar o gráfico
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
                        title: {
                            display: true,
                            text: 'Data'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Preço (USD)'
                        },
                        ticks: {
                            callback: function(value, index, values) {
                                return '$' + value.toFixed(2);
                            }
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
        if (event.key === 'Enter') {
            fetchData();
        }
    });
});