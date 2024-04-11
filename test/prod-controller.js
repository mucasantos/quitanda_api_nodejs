const chai = require("chai")
const product = require("../controllers/productController")

const expect = chai.expect

describe('Product Controller', function () {

    it('should throw error if not have params id',  function (done) {
        const req = {
            params: {
                id: null,
            }
        }
         product.getProduct(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error')
            done()
        }).catch(done)
    })

});