

import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { Routes, Route} from "react-router-dom";
import Swap from "./components/Swap";
import { useAccount , useConnect, useConnectors} from 'wagmi';

// Configure chains and providers




// Configure chains and providers


function App() {
  

const {address , isConnected } = useAccount();


const { connect } = useConnect();

  return (


    <div className="App">
     
     <Header connect={connect} isConnected={isConnected} address={address} />
     <div className="mainWindow">
     <Routes>
          <Route path="/" element={<Swap  isConnected={isConnected} address={address} />} />
      
        </Routes>
        </div>
    </div>    
   
  );
}

export default App;
