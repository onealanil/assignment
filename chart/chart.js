const ctx = document.getElementById("salesChart");

const salesData = {
  labels: [
    "2024-12-10",
    "2024-12-11",
    "2024-12-12",
    "2024-12-13",
    "2024-12-14",
    "2024-12-15",
    "2024-12-16",
  ],
  datasets: [
    {
      label: "Sales Count",
      data: [53, 42, 88, 14, 77, 68, 43],
      backgroundColor: "yellow",
      borderColor: "black",
      borderWidth: 1,
    },
  ],
};

const salesChart = new Chart(ctx, {
    type: "bar",
    data: salesData,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        datalabels: {
          display: true,
          color: 'black',
          font: {
            weight: 'bold',
            size: 14,
          },
          anchor: 'center',
          align: 'center',
          formatter: function (value) {
            return value; 
          },
        },
      },
    },
    plugins: [ChartDataLabels],
  });