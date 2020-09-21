var fs = require('fs');
const salesTaxes = require('./src/app/sales.taxes');

const app = {};

app.purchaiseItems = (file) => {
  try {
    var data = fs.readFileSync(file, 'utf8');
    rows = data.toString().split(/[\r\n]+/);
    totalTaxes = 0;
    totalCost = 0;
    rows.forEach((element) => {
      item = salesTaxes.stringAnalize(element);
      taxes = salesTaxes.itemTaxes(
        item.name,
        item.price,
        item.imported,
        item.quantity
      );
      itemCost = salesTaxes.itemCost(item.quantity, item.price, taxes);
      totalTaxes = totalTaxes + taxes;
      totalCost = totalCost + itemCost;

      imported = '';
      if (item.imported) {
        imported = 'imported ';
      }

      console.log(
        item.quantity +
          ' ' +
          imported +
          item.name +
          ': ' +
          salesTaxes.roundTo(itemCost, 2)
      );
    });
    console.log('Sales Taxes: ' + salesTaxes.roundTo(totalTaxes, 2));
    console.log('Total: ' + salesTaxes.roundTo(totalCost, 2));
  } catch (e) {
    console.log('Error:', e.stack);
  }
};

app.purchaiseItems('src/assets/input/input1.txt');
app.purchaiseItems('src/assets/input/input2.txt');
app.purchaiseItems('src/assets/input/input3.txt');
