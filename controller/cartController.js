const Cart = require("../model/Cart");
const AppError = require("../AppError");
const { sendMail } = require("../utils");

exports.addToCart = (req, res, next) => {
  let productId = req.params.productId;
  let userId = req.user._id;
  Cart.findOne({ userId: userId })
    .then((cart) => {
      console.log(cart);
      return cart.addToCart(productId);
    })
    .then((result) => {
      res.status(200).json({
        status: "success",
        data: result,
      });
    })
    .catch((err) => {
      console.log(err);
      next(new AppError(err.message, 500));
    });
};

exports.decByOne = (req, res, next) => {
  let productId = req.params.productId;
  let userId = req.user._id;
  Cart.findOne({ userId: userId })
    .then((cart) => {
      return cart.decreaseFromCart(productId);
    })
    .then((result) => {
      console.log(result);
      res.status(200).json({
        status: "success",
        data: result,
      });
    })
    .catch((err) => {
      next(new AppError(err.message, 500));
    });
};

exports.deleteFromCart = (req, res, next) => {
  let productId = req.params.productId;
  let userId = req.user._id;
  Cart.findOne({ userId: userId })
    .then((cart) => {
      return cart.removeFromCart(productId);
    })
    .then((result) => {
      console.log(result);
      res.status(200).json({
        status: "success",
        data: result,
      });
    })
    .catch((err) => {
      next(new AppError(err.message, 500));
    });
};

exports.checkOut = async (req, res, next) => {
  let userId = req.user._id;
  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    const items = cart.items.map((i) => ({
      quantity: i.quantity,
      ...i.productId,
    }));
    console.log(items, "items from checkout");
    await sendMail(req.user.email, items);
    res.status(200).json({ message: "Cart Checked Out" });
  } catch (err) {
    console.log(err);
    next(new AppError(err.message, 500));
  }
};

exports.getCart = async (req, res, next) => {
  let userId = req.user._id;
  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    const items = cart.items.map(item => ({ quantity: item.quantity, ...(item.productId.toObject()) }));
    res.status(200).json({
      status: "success",
      data: items,
    });
  } catch (err) {
    console.log(err);
    next(new AppError(err.message, 500));
  }
};
