import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function ProductsChart({ products }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const categories = {};
    products.forEach(product => {
      if (categories[product.category]) {
        categories[product.category] += 1;
      } else {
        categories[product.category] = 1;
      }
    });
    const formattedData = Object.keys(categories).map(category => ({
      name: category,
      cantidad: categories[category]
    }));

    setChartData(formattedData);
  }, [products]);

  return (
    <div className="chart-container">
      <h2>Cantidad de Productos por Categoría</h2>
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 60,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              angle={-45} 
              textAnchor="end"
              height={70}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="cantidad" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>No hay productos disponibles :(</p>
      )}
    </div>
  );
}

export default ProductsChart;