const BackendDomain = "http://localhost:8080"

const SummaryAPI = {
    //User
    SignUp: {
        url: `${BackendDomain}/api/SignUp`,
        // url:BackenDomain+ "/api/SignUp",
        method: "post",
    },
    SignIn: {
        url: `${BackendDomain}/api/SignIn`,
        method: "post",
    },
    current_user: {
        url: `${BackendDomain}/api/user-current`,
        method: "get",
    },
    logout_user: {
        url: `${BackendDomain}/api/user-logout`,
        method: "get",
    },
   
    //Admin Panel(User)
    allUser: {
        url: `${BackendDomain}/api/all-user`,
        method: "get",
    },
    UpdateRole: {
        url: `${BackendDomain}/api/update-role`,
        method: "put",
    },
    //Admin Panel(Product)
    UploadProduct: {
        url: `${BackendDomain}/api/upload-product`,
        method: "post",
    },
    allProduct: {
        url: `${BackendDomain}/api/all-product`,
        method: "get",
    },
    UpdateProduct: {
        url: `${BackendDomain}/api/update-product`,
        method: "put",
    },
    //Product
    categoryProduct: {
        url: `${BackendDomain}/api/category-product`,
        method: "get",
    },
    ProductHome: {
        url: `${BackendDomain}/api/product-home`,
        method: "post",
    },
    ProductDetails: {
        url: `${BackendDomain}/api/product-details`,
        method: "post",
    },
    SearchProducts: {
        url: `${BackendDomain}/api/Search-products`,
        method: "get",
    },
    FilterProducts: {
        url: `${BackendDomain}/api/Filter-products`,
        method: "post",
    },

    //Cart
    AddToCart: {
        url: `${BackendDomain}/api/AddToCart`,
        method: "post",
    },
    QuantityInCart: {
        url: `${BackendDomain}/api/CountInCart`,
        method: "get",
    },
    ProductInCart: {
        url: `${BackendDomain}/api/ProductInCart`,
        method: "get",
    },
    QuantityProductInCart: {
        url: `${BackendDomain}/api/QuantityProductInCart`,
        method: "put",
    },
    DeleteProductInCart: {
        url: `${BackendDomain}/api/DeleteProductInCart`,
        method: "delete",
    },
    
}
export default SummaryAPI
