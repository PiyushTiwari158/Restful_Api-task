const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./app');

chai.use(chaiHttp);
chai.should();

describe('Products API', () => {
describe('POST /products', () => {
it('should create a new product', (done) => {
const product = {
productId: 'P01',
productName: 'Product 1',
qtyPerUnit: '1',
unitPrice: 10.99,
unitInStock: 100,
discontinued: false,
categoryId: 'C01',
};
chai.request(app)
.post('/products')
.send(product)
.end((err, res) => {
  res.should.have.status(201);
  res.body.should.be.a('object');
  res.body.should.have.property('productId').eq('P01');
  res.body.should.have.property('productName').eq('Product 1');
  res.body.should.have.property('qtyPerUnit').eq('1');
  res.body.should.have.property('unitPrice').eq(10.99);
  res.body.should.have.property('unitInStock').eq(100);
  res.body.should.have.property('discontinued').eq(false);
  res.body.should.have.property('categoryId').eq('C01');
  done();
});
});
});
});