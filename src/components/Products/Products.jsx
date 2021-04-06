import React from "react";
import { Grid } from "@material-ui/core";
import Product from "./Product/Product";
import useStyles from "./styles";

// const products = [
//     {id: 1, name:'Shoes', description: 'Running shoes', price: '$5',image:''},
//     {id: 2, name:'Macbook', description: 'Apple Macbook',price: '$53',image:''},
// ];

function Products({ products }) {
  const classes = useStyles();
  console.log(products);
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify="center" spacing={4}>
        {products.map(product => (
          <Grid item key={product.id} xs={12} sm={4}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
}
export default Products;
