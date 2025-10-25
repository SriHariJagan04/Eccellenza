import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Pages/Footer/Footer";
import Contact from "./Pages/Contact/Contact";
import ScrollToTop from "./Utils/ScrollToTop";

const App = () => {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <div className="mainContent">
        <Routes>
          <Route path="/contact" element={<Contact />} />
          {/* other routes */}
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
