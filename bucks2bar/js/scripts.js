// Input with id "username" on change
document.getElementById('username').addEventListener('input', () => {
    const username = document.getElementById('username').value;
    // Regex to check if username has at least 1 capital letter, 1 special character, 1 number, and is at least 8 characters long
    const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    const borderColor = regex.test(username) ? 'green' : 'red';
    document.getElementById('username').style.borderColor = borderColor;
});

document.addEventListener('DOMContentLoaded', () => {
    const getMonthlyData = () => {
        const months = [
            'january', 'february', 'march', 'april',
            'may', 'june', 'july', 'august',
            'september', 'october', 'november', 'december'
        ];
        months.forEach(month => {
            const incomeInput = document.getElementById(`${month}-income`);
            const expensesInput = document.getElementById(`${month}-expenses`);
    
            // Generate random values
            const income = Math.floor(Math.random() * (1000 - 700 + 1)) + 700; // Income between 700 and 1000
            const expenses = Math.floor(Math.random() * (income - 200 + 1)) + 200; // Expenses less than income
    
            // Set default values
            incomeInput.value = income;
            expensesInput.value = expenses;
        });
        return months.map(month => {
            const income = parseFloat(document.getElementById(`${month}-income`).value) || 0;
            const expenses = parseFloat(document.getElementById(`${month}-expenses`).value) || 0;
            return { month, income, expenses };
        });
    };

    const ctx = document.getElementById('barChart').getContext('2d');
    const barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [
                'January', 'February', 'March', 'April', 
                'May', 'June', 'July', 'August', 
                'September', 'October', 'November', 'December'
            ],
            datasets: [
                {
                    label: 'Income',
                    data: [], // Initially empty
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Expenses',
                    data: [], // Initially empty
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }
            ]
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
    const updateChart = () => {
        const monthlyData = getMonthlyData();
        barChart.data.datasets[0].data = monthlyData.map(item => item.income); // Update income dataset
        barChart.data.datasets[1].data = monthlyData.map(item => item.expenses); // Update expenses dataset
        barChart.update(); // Refresh the chart
    };

    // Update the chart when the "Chart" tab is clicked
    document.getElementById('chart-tab').addEventListener('click', updateChart);

    // Function to download the canvas as an image
    document.getElementById('download-btn').addEventListener('click', () => {
        const canvas = document.getElementById('barChart');
        const image = canvas.toDataURL('image/png'); // Convert canvas to data URL
        const link = document.createElement('a');
        link.href = image;
        link.download = 'chart.png'; // Set the file name
        link.click(); // Trigger the download
    });
});
document.getElementById('email-btn').addEventListener('click', () => {
    const canvas = document.getElementById('barChart');
    const chartImage = canvas.toDataURL('image/png'); // Convert canvas to base64 image

    const email = document.getElementById('email-address').value; // user for email
    if (!email) {
        alert('Email is required!');
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Invalid email address!');
        return;
    }

    // Send the email request to the backend
    fetch('http://localhost:3000/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, chartImage })
    })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message);
            } else {
                alert('Failed to send email. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
});