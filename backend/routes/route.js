const express = require("express");
const router = express.Router();

const UserSignUpController = require("../controllers/users/userSignUp");
const userSignInController = require("../controllers/users/userSignIn");
const authToken = require("../middleware/authToken.js");
const userCurrentController = require("../controllers/users/userCurrent.js");
const userLogoutController = require("../controllers/users/userLogout.js");
const Alluser = require("../controllers/users/Admin/Alluser.js");
const UpdateRoleController = require("../controllers/users/Admin/UpdateRole.js");
const UploadProductController = require("../controllers/products/Uploadproduct.js");
const AllProduct = require("../controllers/products/AllProducts.js");
const UpdateProduct = require("../controllers/products/UpdateProduct.js");
const CategoryProduct = require("../controllers/products/CategoryProduct.js");
const ProductInHome = require("../controllers/products/ProductInHome.js");
const DetailsProduct = require("../controllers/products/DetailsProduct.js");
const AddToCart = require("../controllers/users/Cart/AddToCart.js");
const CountProducstInCart = require("../controllers/users/Cart/CountProducstInCart.js");
const ViewProductCart = require("../controllers/users/Cart/ViewProductsInCart.js");
const QuantityProductsInCart = require("../controllers/users/Cart/QuantityProductsInCart.js");
const DeleteProductInCart = require("../controllers/users/Cart/DeleteProductsInCart.js");
const SearchProducts = require("../controllers/products/SearchProducts.js");
const FilterProducts = require("../controllers/products/FilterProducts.js");

//General
router.post("/SignUp", UserSignUpController);
router.post("/SignIn", userSignInController);
router.get("/user-current", authToken, userCurrentController);
router.get("/user-logout", userLogoutController);


//Admin Panel
router.get("/all-user", authToken, Alluser);
router.put("/update-role", authToken, UpdateRoleController);

//Product
router.post("/upload-product", authToken, UploadProductController);
router.get("/all-product", AllProduct);
router.put("/update-product", authToken, UpdateProduct);
router.get("/category-product", CategoryProduct);
router.post("/product-home", ProductInHome);
router.post("/product-details", DetailsProduct);
router.get("/Search-products", SearchProducts);
router.post("/Filter-products",FilterProducts)

//User Add To Cart
router.post("/AddToCart", authToken, AddToCart);
router.get("/CountInCart", authToken, CountProducstInCart);
router.get("/ProductInCart", authToken, ViewProductCart);
router.put("/QuantityProductInCart", authToken, QuantityProductsInCart);
router.delete("/DeleteProductInCart", authToken, DeleteProductInCart);

module.exports = router;
