var express = require('express')
var app = express()
var request = require('request')

// var bodyParser = require('body-parser')


app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/products', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  request({
    url: 'https://startuphack.myshopify.com/api/graphql.json',
    method: "POST",
    headers: {
        "Content-Type": "application/graphql",
        "X-Shopify-Storefront-Access-Token": "f07243bdb352fe1a1f8e24ed033b7e4a"
    },
    // body: "node(id: \"Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzM4MzMwMjcyMw==\") {...on Collection {products(first: 6) {edges {node {description images(first: 1) {edges {node {src}}}}}pageInfo {hasNextPage}}}}}"
    body: "{\n\tnode(id: \"Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzM4MzMwMjcyMw==\") {\n\t... on Collection {\n\t\tproducts(first: 12) {\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\t\tdescription\n\t\t\t\t\timages(first: 1) {\n\t\t\t\t\t\tedges {\n\t\t\t\t\t\t\tnode {\n\t\t\t\t\t\t\t\tsrc\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\n\t\t\tpageInfo {\n\t\t\t\thasNextPage\n\t\t\t}\n\t\t}\n\t}\n  }\n}"
}, function(error, response, body){
    res.json(JSON.parse(body).data.node.products)
});
  // res.json({message: 'tjo'})
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})