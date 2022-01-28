const expect = require('chai').expect

it('First test in this laptop', () => {
    const num1 = 2;
    const num2 = 3;
    const sum = num1 + num2;
    expect(sum).not.to.equal(6)
})