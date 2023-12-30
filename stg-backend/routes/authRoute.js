const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updatedUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrders,
  updateOrderStatus,
  getAllOrders,
  deleteProductFromCart,
  updateProductFromCart,
  getMyOrder,
  getMonthWiseOrderIncom,
  getMonthWiseOrderCount,
  getYearlyTotalOrders,
  getSingleOrders,
  updateOrder,
} = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { checkout, paymentVerfication } = require("../controller/paymentCtrl");
const router = express.Router();
router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken);

router.put("/reset-password/:token", resetPassword);

router.put("/password", authMiddleware, updatePassword);
router.post("/login", loginUserCtrl);
router.post("/admin-login", loginAdmin);
router.post("/cart", authMiddleware, userCart);
router.get("/getMonthWiseOrderIncome", authMiddleware, getMonthWiseOrderIncom);
// router.get("/getMonthWiseOrderCount", authMiddleware, getMonthWiseOrderCount);
router.get("/getYearlyorders", authMiddleware, getYearlyTotalOrders);
// router.post("/cart/applycoupon", authMiddleware, applyCoupon);
router.post("/cart/create-order", authMiddleware, createOrder);
router.post("/order/checkout", checkout);
router.post("/order/paymentverification", authMiddleware, paymentVerfication);
// for getting all user
router.get("/all-users", getallUser);
router.get("/getmyorders", authMiddleware, getMyOrder);
router.get("/getallorders", authMiddleware, isAdmin, getAllOrders);
router.get("/getaOrder/:id", authMiddleware, isAdmin, getSingleOrders);
router.put("/updateOrder/:id", authMiddleware, isAdmin, updateOrder);
// router.post("/getorderbyuser/:id", authMiddleware, isAdmin, getAllOrders);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/cart", authMiddleware, getUserCart);
//for getting single uer
router.get("/:id", authMiddleware, isAdmin, getaUser);
// router.delete("/empty-cart", authMiddleware, emptyCart);
//  deleteProductFromCart;
router.delete(
  "/delete-product-cart/:cartItemId",
  authMiddleware,
  deleteProductFromCart
);

router.delete(
  "/delete-product-cart/:cartItemId/:newQuantity",
  authMiddleware,
  updateProductFromCart
);
// for deleting user
router.delete("/:id", deleteaUser);
//router.delete("/empty-cart", authMiddleware,emptyCart);
// router.put(
//   "/order/update-order/:id",
//   authMiddleware,
//   isAdmin,
//   updateOrderStatus
// );
// for updating single user

router.delete("/cart/empty-cart", authMiddleware, emptyCart);
router.put("/edit-user", authMiddleware, updatedUser);
router.put("/save-address", authMiddleware, saveAddress);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

module.exports = router;
