const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Products",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

cartSchema.methods.addToCart = function (productId) {
  const ifExistedIndex = this.items.findIndex((product) => {
    // console.log(product.productId.toString());
    // console.log(productId.toString());
    return product.productId.toString() === productId.toString();
  });
  const updatedCartItems = [...this.items];
  // console.log(ifExistedIndex);
  if (ifExistedIndex > -1) {
    let newQuantity = updatedCartItems[ifExistedIndex].quantity + 1;
    updatedCartItems[ifExistedIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: productId,
      quantity: 1,
    });
  }
  this.items = updatedCartItems;
  return this.save();
};

cartSchema.methods.decreaseFromCart = function (productId) {
  const ifExistedIndex = this.items.findIndex((product) => {
    return product.productId.toString() === productId.toString();
  });
  const updatedCartItems = [...this.items];
  if (ifExistedIndex > -1) {
    let newQuantity = updatedCartItems[ifExistedIndex].quantity - 1;
    if (newQuantity > 0) {
      updatedCartItems[ifExistedIndex].quantity = newQuantity;
    } else {
      newUpdatedCartItems = updatedCartItems.filter(
        (product) => product.productId.toString() !== productId.toString());
      this.items = newUpdatedCartItems;
      return this.save();
    }
  } else {
    throw Error("Item doesn't exist in cart");
  }
  this.items = updatedCartItems;
  return this.save();
};

cartSchema.methods.removeFromCart = function (productId) {
  const updatedCartItems = this.items.filter(
    (item) => item.productId.toString() !== productId.toString()
  );
  // console.log(updatedCartItems);
  this.items = updatedCartItems;
  return this.save();
};

module.exports = mongoose.model("cart", cartSchema);
