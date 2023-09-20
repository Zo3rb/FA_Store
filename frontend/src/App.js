import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  ProductDetailsPage,
  ShopCreatePage,
  SellerActivationPage,
  ShopLoginPage,

} from "./routes/Routes";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import Store from "./redux/store";
import { loadSeller, loadUser } from "./redux/actions/user";
import { useSelector } from "react-redux";
import { ShopHomePage } from "./ShopRoutes.js";
import SellerProtectedRoute from "./routes/SellerProtectedRoute";

const App = () => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const { isLoading, isSeller} = useSelector((state) => state.seller);

  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
  }, []);

  return (
    <>
      {loading || isLoading ? null : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
            <Route
              path="/activation/:activation_token"
              element={<ActivationPage />}
            />
            <Route
              path="/seller/activation/:activation_token"
              element={<SellerActivationPage />}
            />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:name" element={<ProductDetailsPage />} />
            <Route path="/best-selling" element={<BestSellingPage/>} />
            <Route path="/events" element={<EventsPage/>} />
            <Route path="/faq" element={<FAQPage/>} />

            {/* shop Rout */}
            <Route path="/shop-create" element={<ShopCreatePage/>} />
            <Route path="/shop-login" element={<ShopLoginPage/>} />
            <Route path="/shop/:id" element={
              <SellerProtectedRoute
                isSeller={isSeller}
              >
                <ShopHomePage/>
              </SellerProtectedRoute>
            } />
          </Routes>
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
