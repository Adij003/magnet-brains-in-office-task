import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GiChocolateBar } from "react-icons/gi";


function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p>Hey, click on products page to see all the products!</p>
      {/* <button className="btn ">
        {" "}
        <GiChocolateBar /> Products{" "}
      </button> */}
    </div>
  );
}

export default Home;
