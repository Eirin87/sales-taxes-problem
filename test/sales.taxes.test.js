const assert = require('assert');
const salesTaxes = require('../src/app/sales.taxes');

describe('sales.taxes.js tests', () => {
  describe('sales.taxes.itemTaxes()', () => {
    it('should equal 0', () => {
      expected = 0;
      const result = salesTaxes.itemTaxes('book', 12.49, false, 2);
      assert.strictEqual(result, expected);
    });
    it('should equal 3', () => {
      expected = 3;
      const result = salesTaxes.itemTaxes('music CD', 14.99, false, 2);
      assert.deepStrictEqual(result, expected);
    });
    it('should equal 1.3', () => {
      expected = 1.3;
      const result = salesTaxes.itemTaxes('book', 12.49, true, 2);
      assert.strictEqual(result, expected);
    });
    it('should equal 4.5', () => {
      expected = 4.5;
      const result = salesTaxes.itemTaxes('music CD', 14.99, true, 2);
      assert.strictEqual(result, expected);
    });
  });

  describe('sales.taxes.itemCost()', () => {
    it('should equal 46.47', () => {
      expected = 46.47;
      const result = salesTaxes.itemCost(3, 14.99, 1.5);
      assert.strictEqual(result, expected);
    });
  });

  describe('sales.taxes.stringAnalize()', () => {
    it("should equal {name: 'book', qunatity: 2, price: 12.49,	imported: true}", () => {
      const result = salesTaxes.stringAnalize('2 imported book at 12.49');
      expected = {
        name: 'book',
        quantity: 2,
        price: 12.49,
        imported: true,
      };
      assert.deepStrictEqual(result, expected);
    });
    it("should equal {name: 'book', quantity: 2, price: 12.49,	imported: false}", () => {
      const result = salesTaxes.stringAnalize('2 book at 12.49');
      expected = {
        name: 'book',
        quantity: 2,
        price: 12.49,
        imported: false,
      };
      assert.deepStrictEqual(result, expected);
    });
  });

  describe('salesTaxes.roundTo()', () => {
    it('should equal 0.7', () => {
      var myNum = 2 / 3;
      const result = salesTaxes.roundTaxes(myNum, 2);
      assert.strictEqual(result, 0.7);
    });
  });

  describe('salesTaxes.roundTo()', () => {
    it('should equal 0.67', () => {
      var myNum = 2 / 3;
      const result = salesTaxes.roundTo(myNum, 2);
      assert.strictEqual(result, 0.67);
    });
  });
});
