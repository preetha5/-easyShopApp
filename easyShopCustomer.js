let mysql = require("mysql");
let inquirer = require("inquirer");

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "myamazondb"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as ", connection.threadId);
  showAllProducts();
});

//Function to show all available products in inventory
function showAllProducts() {
  connection.query(
    "select item_id,product_name,price from products ORDER BY item_id",
    function(err, resp) {
      if (err) throw err;
      for (let i = 0; i < resp.length; i++) {
        console.log(
          resp[i].item_id + " " + resp[i].product_name + " -$" + resp[i].price
        );
      }
      start();
    }
  );
}

//Starting the inquirer function
function start() {
  inquirer
    .prompt([
      {
        name: "ID",
        type: "input",
        message: "What is the ID of the product you would like to buy?"
      },
      {
        name: "quantity",
        message: "How many items do you want to buy?",
        validate: function(name) {
          return /^\d+$/.test(name) || "Quantity should be a whole number";
        }
      }
    ])
    .then(function(answers) {
      console.log(answers);
      connection.query(
        "select stock_quantity, price from products where item_id=?",
        answers.ID,
        function(err, data) {
          if (err) throw err;
          available = data[0].stock_quantity;
          let price = data[0].price;
          if (available < answers.quantity) {
            console.log("Insufficient quantity! Try again.");
            quitApp();
          } else {
            console.log("Item purchased. Total Cost: $", price);
            updateInventory(data[0], answers.quantity);
            quitApp();
          }
        })
    })
}

//Function that ends the app and sql connection
function quitApp(){
    inquirer.prompt([
        {
            name: "continue",
            message: "Would you like to make another purchase",
            type: "confirm",
            default: true
            }
        ])
        .then((response)=> {
        if(response.continue){
            showAllProducts();
        }
        else{
            console.log("Thank you for shopping with EasyShop.");
            connection.end();
        }
        })
};//End quitApp function

//function that updates the mysql DB with new stock
function updateInventory(data, quantity) {
  console.log("Updating Stock..........\n");
  let newStock = data.stock_quantity - quantity;
  let price = data.price;
  connection.query(
    "update products set stock_quantity=? where item_id=?",
    [newStock, data.id],
    function(err, resp) {
      if (err) throw err;
      //showCost(data, quantity);
      
      //showAllProducts();
    }
  );
}

// function showCost(dbItem, quantity){
    
//     let total = parseFloat(Math.round((quantity * dbItem.price) * 100) / 100).toFixed(2);
//     console.log("Total cost for your purchase: ", total);

//     //Add order into orders table
//     let query = connection.query("INSERT INTO ORDERS SET ?",
//     {
//         qty :quantity,
//         total_price : total,
//         product : dbItem.product_name
//     },
//     function(err, res){
//         if(err) throw err;
//         console.log("Order saved in DB");
//     });
// }
