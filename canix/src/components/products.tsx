import React from 'react'

type ProductPropTypes = {
    date: Date,
    product_id: string,
    weight: number,
    unit: string,
};

type ProductsPropTypes = {
    products: ProductPropTypes[],
};

function Products(props: ProductsPropTypes) {
  return (
    <div>
        <h1>These products are from the API</h1>
                {props.products.map((product: ProductPropTypes) => {
                    return (
                        <div key={product.product_id}>
                            <h2>{product.product_id}</h2>
                            <p>{product.date.toString()}</p>
                            <p>{product.weight}</p>
                            <p>{product.unit}</p>
                        </div>
                    )
                })}
            </div>
          )
        }

export default Products;
