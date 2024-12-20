import { Toaster } from "react-hot-toast";
import "./App.css";
import AppRoute from "./routes";
import { useEffect, useState } from "react";

function App() {
  const userValue = true;
  const [theme, setTheme] = useState(userValue ? 'dark' : 'light');


  useEffect(() => {
    // Update theme class dynamically if the roleValue changes
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <div className="bg-white dark:bg-[#283641]">
      <Toaster position="top-center" reverseOrder={false} />
      <AppRoute />
    </div>
  );
}

export default App;
