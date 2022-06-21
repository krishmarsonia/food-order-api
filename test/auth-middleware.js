const expect = require("chai").expect;
const authMiddleware = require("../Middlewares/is-auth");
const jwt = require("jsonwebtoken");
const sinnon = require("sinon");

describe("Auth Middleware tests", function () {
  it("should throw an error if there is no authorization header is present", function () {
    const req = {
      get: function (headerName) {
        return null;
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
      "No Authorization Header is present"
    );
  });

  it("should throw an error if there is only one string in authorization header", function () {
    const req = {
      get: function () {
        return "xyz";
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });

  it("should yieald the user in the req object", function () {
    const req = {
      get: function () {
        return "Bearer dskjfbskfvkvjbsjvbs";
      },
    };

    sinnon.stub(jwt, "verify");
    jwt.verify.returns({ userId: "abcd" });
    authMiddleware(req, {}, () => {});
    expect(req).to.have.property("userId");
    expect(req).to.have.property("userId", 'abcd')
    expect(jwt.verify.called).to.be.true;
    jwt.verify.restore();
  });

  it("should throw the error if the token can't be verified", function(){
      const req = {
          get: function(){
              return 'Bearer ABC'
          }
      }

      expect(authMiddleware.bind(this, req, {}, () => {})).to.throw()
  })
});
