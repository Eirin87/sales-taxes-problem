const baseGoodList = require('../assets/base.goods.list');

basicSalesTax = 10;
importDuty = 5;

const salesTaxes = {};

salesTaxes.itemTaxes = (name, price, imported, quantity) => {
  itemFound = false;
  taxes = 0;
  Object.entries(baseGoodList).forEach(([key, value]) => {
    if (value.includes(name)) {
      itemFound = true;
    }
  });
  if (!itemFound) {
    taxes = (price * basicSalesTax) / 100;
  }
  if (imported) {
    taxes = taxes + (price * importDuty) / 100;
  }

  return quantity * salesTaxes.roundTaxes(taxes, 2);
};

salesTaxes.itemCost = (quantity, price, taxes) => {
  return quantity * price + taxes;
};

salesTaxes.stringAnalize = (listItem) => {
  item = { imported: false };
  if (listItem.includes('imported')) {
    item.imported = true;
    listItem = listItem.replace('imported ', '');
  }
  temp = listItem.split('at ');
  item.price = parseFloat(temp[1].trim());
  var r = /\d+/;
  item.quantity = parseInt(temp[0].match(r)[0].trim());
  item.name = temp[0].replace(/[0-9]/g, '').trim();
  return item;
};

salesTaxes.roundTaxes = (value, places) => {
  var power = Math.pow(10, places);
  val = Math.round(value * power) / power;
  return Math.ceil(value * 20) / 20;
};

salesTaxes.roundTo = (value, places) => {
  var power = Math.pow(10, places);
  return Math.round(value * power) / power;
};

module.exports = salesTaxes;
