import Header from "./components/Header";
import Footer from './components/Footer'
import { Outlet } from "react-router-dom";

import "./App.css";
import { ThemeProvider } from "./ThemeContext";

const App = () => {
  
  return (
    <ThemeProvider>
      <Header />
      <Outlet />
      <Footer />
    </ThemeProvider>
  );
};

export default App;
