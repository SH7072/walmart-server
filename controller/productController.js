const Product = require("../model/Product");
const AppError = require("../AppError");
const axios = require("axios");

exports.addProduct = async (req, res, next) => {
  const { name, link, price, img } = req.body;
  const product = new Product({ name: title, link: url, price, img });
  product
    .save()
    .then((result) => {
      // console.log(result);
      res.status(200).json({
        status: "success",
        data: result,
      });
    })
    .catch((err) => {
      next(new AppError(err.message, 500));
    });
};

exports.getProducts = async (req, res, next) => {
  Product.find()
    .then((products) => {
      // console.log(products);
      res.status(200).json({
        status: "success",
        data: products,
      });
    })
    .catch((err) => {
      next(new AppError(err.message, 500));
    });
};

exports.getById = async (req, res, next) => {
  const id = req.params.id;
  Product.findById(id)
    .then((prod) => {
      // console.log(prod);
      res.status(200).json({
        status: "success",
        name: prod.name,
        link: prod.link,
        img: prod.img,
        price: prod.price,
      });
    })
    .catch((err) => {
      console.log(err);
      next(new AppError(err.message, 500));
    });
};

exports.deleteProduct = async (req, res, next) => {
  let id = req.body.id;
  Product.findByIdAndRemove(id)
    .then((result) => {
      // console.log(result);
      res.status(200).json({
        status: "success",
        data: result,
      });
    })
    .catch((err) => {
      next(new AppError(err.message, 500));
    });
};

exports.updateProduct = (req, res, next) => {
  const { id, name, description, link, img, price } = req.body;
  Product.updateOne({ _id: id }, { name, description, link, img, price })
    .then((result) => {
      // console.log(result);
      res.status(200).json({ status: "success", data: result });
    })
    .catch((err) => {
      console.log(err);
      next(new AppError(err.message, 500));
    });
};
