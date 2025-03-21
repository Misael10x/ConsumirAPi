import React from 'react';

function ProductsTable({ products }) {
  return (
    <div className="table-container">
      <table className="products-table">
        <thead>
          <tr>
            <th>NOMBRE</th>
            <th>PRECIO</th>
            <th>CATEGORÍA</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="3">No se encontraron productos</td>
            </tr>
          ) : (
            products.map(product => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.category}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsTable;