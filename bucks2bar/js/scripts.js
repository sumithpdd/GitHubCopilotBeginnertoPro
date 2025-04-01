
// input with id "username" on change
document.getElementById('username').addEventListener('input', function () {
    const username = document.getElementById('username').value;
    // regex to check if username has atleast 1 capital letter , 1 special character, 1 number, and is at least 8 characters long
    const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    if (regex.test(username)) {
       //set the username input border to green
       document.getElementById('username').style.borderColor = 'green';

    } else {
        document.getElementById('username').style.borderColor = 'red';
    }
});

document.addEventListener('DOMContentLoaded', function () {
    function getMonthlyData() {
        const months = [
            'january', 'february', 'march', 'april', 
            'may', 'june', 'july', 'august', 
            'september', 'october', 'november', 'december'
        ];

        const data = months.map(month => {
            const income = parseFloat(document.getElementById(`${month}-income`).value) || 0;
            const expenses = parseFloat(document.getElementById(`${month}-expenses`).value) || 0;
            return { month, income, expenses };
        });

        return data;
    }

    const ctx = document.getElementById('barChart').getContext('2d');
    const barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [{
                label: 'Income',
                data: [], // Initially empty
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }, {
                label: 'Expenses',
                data: [], // Initially empty
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Function to update the chart dynamically
    function updateChart() {
        const monthlyData = getMonthlyData();
        const incomeData = monthlyData.map(item => item.income);
        const expensesData = monthlyData.map(item => item.expenses);

        barChart.data.datasets[0].data = incomeData; // Update income dataset
        barChart.data.datasets[1].data = expensesData; // Update expenses dataset
        barChart.update(); // Refresh the chart
    }

    // Example: Update the chart when the "Chart" tab is clicked
    document.getElementById('chart-tab').addEventListener('click', updateChart);

    // Function to download the canvas as an image
    document.getElementById('download-btn').addEventListener('click', function () {
        const canvas = document.getElementById('barChart');
        const image = canvas.toDataURL('image/png'); // Convert canvas to data URL
        const link = document.createElement('a');
        link.href = image;
        link.download = 'chart.png'; // Set the file name
        link.click(); // Trigger the download
    });
});