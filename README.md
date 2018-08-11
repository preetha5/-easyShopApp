# EasySHOP

This is a console storefront application created using node.js/MySQL that takes into consideration 3 perspectives - Customer view, Manager view and Supervisor view(TBD).

## Features 

The application utilizes a centralized MySQL database which houses product data, inventory and sales. 
In the easyShopCustomer view every customer can:
*View Products and their Price
*Purchase Products
*View total cost

In the easyShopManager view every manager can:
*View all products
*View Products that are low in quantity
*Add more stocks for any product
*Add new Product into the Inventory Database

### Usage instructions
From the command line, available options are

    * `node easyShopCustomer` - Customer
    * `node easyShopManager`- Manager
    * Supervisor - TBD

###Screenshots
In this screenshot, the customer is shown all the products and can select products by item ID.After selection, the cost for that purchase is shown. Then the user is given the option to conitnue with another purchase or quit.
<img width="960" alt="easyshop customer" src="./assets/images/customer1.png">


This screenshot shows the manager menu options which allow them to manage inventory by adding inventory and new products.
<img width="960" alt="easyshop manager" src="./assets/manager1.png">
<img width="960" alt="easyshop manager" src="./assets/manager2.png">

