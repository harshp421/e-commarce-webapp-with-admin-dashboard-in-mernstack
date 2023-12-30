const express = require("express");
const {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
} = require("../controller/productCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

// Creating product
router.post("/", authMiddleware, isAdmin, createProduct);
//get a single product
router.get("/:id", getaProduct);
//add to wishlist
router.put("/wishlist", authMiddleware, addToWishlist);
// add rating 
router.put("/rating", authMiddleware, rating);

//update  single product
router.put("/:id", authMiddleware, isAdmin, updateProduct);
//Deleting product
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);
//Get all product
router.get("/", getAllProduct);

module.exports = router;
