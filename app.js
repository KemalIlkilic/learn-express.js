const express = require("express");
const app = express();
const { products } = require("./data");

app.get("/", (req, res) => {
  res.send("<h1> Home Page </h1><a href='/api/products'>products</a> ");
});

app.get("/api/products", (req, res) => {
  res.json(products.map(({ id, name, image }) => ({ id, name, image })));
});

app.get("/api/products/:productID", (req, res) => {
  // productID will be come back as a string
  const { productID } = req.params;
  const product = products.find(({ id }) => id === Number(productID));
  if (!product) {
    return res.status(404).send("Product does not exist");
  }
  return res.json(product);
});

app.get("/api/products/:productID/reviews/:reviewID", (req, res) => {
  // { productID: ':productID', reviewID: '2' }
  console.log(req.params);
  res.send("Hello world");
});

app.get("/api/v1/query", (req, res) => {
  // http://localhost:5001/api/v1/query?name=john&id=4 ,{ name: 'john', id: '4' }
  // http://localhost:5001/api/v1/query?search=a&limit=2 { search: 'a', limit: '2' }
  //console.log(req.query);
  const { search, limit } = req.query;
  let sortedProducts = [...products];
  if (search) {
    sortedProducts = sortedProducts.filter(({ name }) =>
      name.startsWith(search)
    );
  }
  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }
  if (sortedProducts.length < 1) {
    // return res.status(200).send("no products matched your search");
    return res.status(200).json({ success: true, data: [] });
  }
  return res.status(200).json(sortedProducts);
});

app.listen(5001, () => {
  console.log("Server is listening on port 5001");
});
