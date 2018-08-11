let mysql = require("mysql");
let inquirer = require("inquirer");

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "myAmazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as ", connection.threadId);
  start();
});

function start() {
  inquirer
    .prompt([
      {
        name: "options",
        type: "list",
        choices: ["View all products", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"]
      }
    ])
    .then(function(selection) {
      if(selection.options === "View all products"){
          showAllProducts();
      }else
      if(selection.options === "View Low Inventory"){
          showLowInventory();
      }else
      if(selection.options === "Add to Inventory"){
        AddToInventory();
      } else
      if(selection.options === 'Add New Product'){
          addNewProduct();
      }else{
          console.log("Thanks you for using easyShopManager!");
          connection.end();
      }
    });
}


function showAllProducts() {
    console.log("-------------------------\n");
    console.log("All Products");
    console.log("-------------------------\n");
    connection.query(
        "select item_id,product_name,price, stock_quantity from products ORDER BY item_id",
        function(err, resp) {
        if (err) throw err;
        for (let i = 0; i < resp.length; i++) {
            console.log("\n Item iD: "+
            resp[i].item_id + " " + 
            resp[i].product_name + 
            " -$" + resp[i].price
            + " Quantity: " +resp[i].stock_quantity+"\n");
        }
        start();
        }
    );
}

function showLowInventory() {
    connection.query(
        "select item_id,product_name,stock_quantity from products WHERE stock_quantity <10 ORDER BY item_id",
        function(err, resp) {
        if (err) throw err;
        console.log(resp);
        if(!resp.length){
            console.log("Enough stock available");
        }else{
        for (let i = 0; i < resp.length; i++) {
            console.log(
            resp[i].product_name + " Quantity: " + resp[i].stock_quantity
            );
        }
        }
        start();
        }
    );
}

function AddToInventory(){
    connection.query(
        "select item_id,product_name,price, stock_quantity from products ORDER BY item_id",
        function(err, resp) {
        if (err) throw err;
        for (let i = 0; i < resp.length; i++) {
            console.log("\n Item iD: "+
            resp[i].item_id + " " + 
            resp[i].product_name + 
            " -$" + resp[i].price
            + " Quantity: " +resp[i].stock_quantity+"\n");
        }
        inquirer.prompt([
        {
            name:'ID',
            type: "input",
            message:"Enter the item ID of the product to add quantity to:"
        },
        {
            name: "quantity",
            message: "How many items do you want to add?",
            type: "input",
            validate: function(name) {
              return /^\d+$/.test(name) || "Quantity should be a whole number";
            }
        }

    ]).then((response)=>{
        console.log("Adding to inventory");
        connection.query('update products set stock_quantity=stock_quantity+? where item_id=?', [response.quantity, response.ID],
        function(err, resp){
            if (err) throw err;
            console.log("Updated Quantity for item" ,response.ID);
            start();
        })
    })
    });
    }

function addNewProduct(){
    inquirer.prompt([
        {
            name:'product',
            type: "input",
            message:"Enter the name of the product you want to add:"
        },
        {
            name:'department',
            type: "input",
            message:"Enter the department name for the product:"
        },
        {
            name:'price',
            type: "input",
            message:"Enter the price of the product you want to add:"
        },
        {
            name: "quantity",
            message: "How many items do you want to add :",
            type: "input",
            validate: function(name) {
                return /^\d+$/.test(name) || "Quantity should be a whole number";
            }
        }
    ])
    .then((answers)=>{
        console.log(answers);
        let newProd = {
            product_name:answers.product,
            department_name: answers.department,
            price: answers.price,
            stock_quantity: answers.quantity
        };
        connection.query('Insert into products set ?',newProd, 
            function(err, data){
                if(err) throw err;
                console.log("New Product ", answers.product," has been added to the inventory");
                start();
            })
            
    });
}
