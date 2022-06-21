const expect = require('chai').expect;
const userController = require('../controller/userController');

describe('User controller test', function(){
    it('should throw error if there is no username', function(){
        const req = {
            body:function(){
                // let data = {};
                // data.userName = 'xyz';
                // return data.userName;
                data = function(){
                    const userName = "xyz";
                    return userName;
                }
                // return null;

            }
        };
        expect(userController.signup.bind(this, req, {}, () => {})).to.throw('no username')
    });
    it('should be a post request', function(){
        expect(userController.signup.bind())
    })
})

