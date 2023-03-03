const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Product = mongoose.model('Product', {
  productId: String,
  productName: String,
  qtyPerUnit: String,
  unitPrice: Number,
  unitInStock: Number,
  discontinued: Boolean,
  categoryId: String,
  });
  
  const Category = mongoose.model('Category', {
  categoryId: String,
  categoryName: String,
  });

  // Create a Product
app.post('/products', async (req, res) => {
const { productId, productName, qtyPerUnit, unitPrice, unitInStock, discontinued, categoryId } = req.body;

// Check if the category exists
const category = await Category.findOne({ categoryId });
if (!category) {
return res.status(400).send({ message: 'Category not found' });
}

// Create the product
const product = new Product({ productId, productName, qtyPerUnit, unitPrice, unitInStock, discontinued, categoryId });
await product.save();

return res.status(201).send(product);
});

// Create a Category
app.post('/categories', async (req, res) => {
  const { categoryId, categoryName } = req.body;
  
  // Create the category
  const category = new Category({ categoryId, categoryName });
  await category.save();
  
  return res.status(201).send(category);
  });

  // Read a Product
app.get('/products/:productId', async (req, res) => {
  const product = await Product.findOne({ productId: req.params.productId }).populate('categoryId');
  if (!product) {
  return res.status(404).send({ message: 'Product not found' });
  }
  
  return res.send(product);
  });
  
  // Read all Products
  app.get('/products', async (req, res) => {
  const products = await Product.find().populate('categoryId');
  return res.send(products);
  });

  // Update a Product

  app.put('/products/:productId', async (req, res) => {
    try {
    const product = await Product.findOne({ productId: req.params.productId });
    if (!product) {
    return res.status(404).send({ message: 'Product not found' });
    }

    const { productName, qtyPerUnit, unitPrice, unitInStock, discontinued, categoryId } = req.body;

    product.productName = productName || product.productName;
    product.qtyPerUnit = qtyPerUnit || product.qtyPerUnit;
    product.unitPrice = unitPrice || product.unitPrice;
    product.unitInStock = unitInStock || product.unitInStock;
    product.discontinued = discontinued || product.discontinued;
    product.categoryId = categoryId || product.categoryId;
    
    const updatedProduct = await product.save();
    
    res.json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
    }
    });

    app.delete('/products/:productId', async (req, res) => {
      const product = await Product.findOne({ productId: req.params.productId });
      if (!product) {
      return res.status(404).send({ message: 'Product not found' });
      }
      
      await product.remove();
      
      return res.send({ message: 'Product deleted successfully' });
      });
      
      
      

// Connect to MongoDB
mongoose.connect('mongodb+srv://Persistence:Piyush9589@cluster0.9clhmot.mongodb.net/?retryWrites=true&w=majority'),{
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});
app.get('/test', async (req, res) => {
  try {
    const newProduct = new Product({
      productId: 'test-product',
      productName: 'Test Product',
      qtyPerUnit: '1',
      unitPrice: 10.99,
      unitInStock: 100,
      discontinued: false,
      categoryId: 'test-category'
    });

    const savedProduct = await newProduct.save();

    res.json(savedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


app.listen(3000, () => {
  console.log('Server started');
  });


module.exports = app;
