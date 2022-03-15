import { useState } from "react";
import Footer from "./components/Footer";
import Tabs from "./components/Tabs";
import Tasks from "./components/Tasks";

function App() {
  const [activeTab, setActiveTab] = useState('All')
  return (
    <>
      <header className="max-w-6xl m-auto p-4">
        <p className="text-4xl text-center font-Raleway">#todo</p>
      </header>
      <main className="max-w-6xl m-auto">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab}/>
        <Tasks activeTab={activeTab} />
      </main>
      <Footer/>
    </>
  );
}

export default App;
