import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import AllProducts from "./pages/AllProducts";
import PrivateRoute from "./components/PrivateRoute";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import CancelledPage from "./pages/CancelledPage";
import SuccessPage from "./pages/SuccessPage";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<PrivateRoute />}>
            <Route path="/products" element={<AllProducts />} />
            </Route>
            <Route path="/cart" element={<PrivateRoute />}>
            <Route path="/cart" element={<Cart />} />
            </Route>

            <Route path="/order" element={<PrivateRoute />}>
            <Route path="/order" element={<Order />} />
            </Route>
            <Route path="/cancel" element={<PrivateRoute />}>
            <Route path="/cancel" element={<CancelledPage />} />

            </Route>
            <Route path="/success" element={<PrivateRoute />}>
            <Route path="/success" element={<SuccessPage />} />

            </Route>

            
            
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
