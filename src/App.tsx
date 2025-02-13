import React from "react";
import { useNavigation } from "./contexts/NavigationContext";
import Login from "./pages/Login";
import Player from "./pages/Player";
import Promos from "./pages/Promos";
import Upload from "./pages/Upload";
import Navbar from "./components/Navbar"

const App: React.FC = () => {
  const { currentScreen } = useNavigation();

  const renderPage = () => {
    switch (currentScreen) {
      case 'login':
        return <Login />;
      case 'player':
        return <Player />;
      case 'promos':
        return <Promos />;
      case 'upload':
        return <Upload />;
      default:
        return null;
    }
  };

  return (
    <div className="font-quicksand bg-zinc-950 text-zinc-50 h-screen flex flex-row antialiased">
      <Navbar/>
      <div className="flex-1">
        {
          renderPage()
        }
      </div>
    </div>
  )
}

export default App
