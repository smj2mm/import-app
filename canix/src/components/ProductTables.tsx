import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Table, Card } from 'react-bootstrap';

import { API_BASE_URL, DECIMAL_PRECISION } from '../constants';
import { convertToKilograms } from '../helpers'

interface Product {
    id: number;
    date: string;
    product_id: string;
    weight: number;
    unit: string;
}

interface CategorySummary {
    category: string;
    total_weight: number;
}

interface ApiResponse {
    category_summaries: CategorySummary[]; // KILL
    import_date: string; // KILL
    products_by_category: {
        [category: string]: Product[];
    };
}

interface ProductTableProps {
    dataRefreshTrigger: number; // Prop to force re-render on change
}

const formatDate = (date: string): string => {
    const dateObject = new Date(date);
    return dateObject.toLocaleString();

}

const totalWeightForCategory = (products: Product[]): number => {
    const totalWeightKgs = products.reduce((sum, product) => {
        const convertedWeight = convertToKilograms(product.weight, product.unit);
        return sum + convertedWeight;
    }, 0);
    return Number(totalWeightKgs.toPrecision(DECIMAL_PRECISION));
};

const earliestDate = (products: Product[]): string => {
    const dates = products.map(product => new Date(product.date).getTime()); // Convert dates to numbers
    const earliest = new Date(Math.min.apply(null, dates));
    return earliest.toLocaleString();
}

const ProductTables: React.FC<ProductTableProps> = ({ dataRefreshTrigger }) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse>(`${API_BASE_URL}/products/get_products`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [dataRefreshTrigger]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {(data?.products_by_category && Object.keys(data.products_by_category).length > 0) && (
        <>
          <h1 className="mt-3">Products by Category</h1>
          {Object.keys(data.products_by_category).map(category => (
            <Card key={category} className="my-3">
              <Card.Body>
                <Card.Title>
                  Category: {category} <br />
                  Total Weight: {totalWeightForCategory(data.products_by_category[category])} kilograms <br />
                  Import Date: {earliestDate(data.products_by_category[category])}
                </Card.Title>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Product ID</th>
                      <th>Date</th>
                      <th>Weight</th>
                      <th>Unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.products_by_category[category].map(product => (
                      <tr key={product.id}>
                        <td>{product.product_id}</td>
                        <td>{formatDate(product.date)}</td>
                        <td>{product.weight}</td>
                        <td>{product.unit}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          ))}
        </>
      )}
    </div>
  );
};

export default ProductTables;
