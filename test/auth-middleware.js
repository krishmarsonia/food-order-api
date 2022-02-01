const expect = require('chai').expect;
const authMiddleware = require('../Middlewares/is-auth');

it('should throw an error if there is no authorization header is present', function(){
    const req = {
        get: function(headerName){
            return null;
        }
    }
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw('No Authorization Header is present');
})