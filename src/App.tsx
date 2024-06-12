
import './App.css'
import MyForm, {Answer} from "./Form.tsx";
import React from "react";
import calculon from './assets/calculon.jpeg'




function App() {

  return (
    <>
        <img src={calculon} alt="Calculon" />

        <MyForm/>
        </>
  )
}

export default App
