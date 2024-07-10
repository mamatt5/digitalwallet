# Overview

This documentation provides instructions for integrating the PayPath button into your eCommerce website. The integration involves adding a ```<div>``` element and a ```<script>``` tag to your HTML and implementing four JavaScript methods to handle various stages of the payment process.

## Integration Steps{#integration-steps}

1. Add the PayPath Button Placeholder

Include the following ```<div>``` element in the location where you want the PayPath button to appear:

````html
<div id="payPathApiDiv"></div>
````

2. Include the PayPath Script

Add the following ```<script>``` tag at the bottom of your HTML ```<body>```:

````html
<script src="http://192.168.1.116:8000/static/fetchButton.js"></script>
````

## Example

````html
<body>
    <div>
        <!-- HTML code -->
        <div id="payPathApiDiv"></div>
        <!-- More HTML code -->
    </div>
    <script src="http://192.168.1.116:8000/static/fetchButton.js"></script>
</body>
````

## JavaScript Methods{#javascript-methods}
The following JavaScript methods must be implemented to handle various stages of the payment process. Only ```getItems``` is mandatory.

1. getItems()

**Description:** This method returns a list of items to be purchased.

**Return Type:** Array of objects containing ```{name: String, quantity: Number, price: Double}```

**Example:**
````js
  const listOfItems = [
    {
        name: "Lora's Signature Coffee Beans 500g",
        price: 29.00,
        quantity: 2
    },
    {
        name: "French Press Coffee Maker",
        price: 69.95,
        quantity: 1
    },
    {
        name: "MILKLAB Almond Milk (8 X 1L)",
        price: 48.99,
        quantity: 1
    },
  ];

  const getItems = () => {
    return listOfItems;
  }
````

2. windowOpened()

**Description:** This optional method runs when the payment window is opened.

**Return Type:** None

**Example:**
````js
  const windowOpened = () => {
    console.log("Payment window opened");
}
````

3. transactionComplete()
**Description:** This optional method runs when the transaction is complete. Return true to automatically close the payment window, or false to keep it open.

**Return Type:** Boolean

**Example:**
````js
const transactionComplete = () => {
    console.log("Transaction complete");
    return true;  // Close the payment window automatically
}
````

4. windowClosed()
**Description:** This optional method runs when the payment window is closed.

**Return Type:** None

**Example:**
````js
const windowClosed = () => {
    console.log("Payment window closed");
}
````

## Need help?{#need-help}

Feel free to reach out to one of our developers [here](https://google.com).
