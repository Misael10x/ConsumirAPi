import { useState, useEffect } from 'react';
import './App.css';
import ProductsTable from './components/ProductsTable';
import ProductsChart from './components/ProductsChart';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const results = products.filter(product => 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleChart = () => {
    setShowChart(!showChart);
  };

  return (
    <div className="container">
      <h1>Productos en venta</h1>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar por nombre o categoría..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <button 
          onClick={toggleChart} 
          className="chart-button"
        >
          {showChart ? 'Ver Tabla' : 'Ver Gráfica'}
        </button>
      </div>

      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <>
          {showChart ? (
            <ProductsChart products={filteredProducts} />
          ) : (
            <ProductsTable products={filteredProducts} />
          )}
        </>
      )}
    </div>
  );
}

export default App;