import React from "react";
import {Meme} from "../Meme/Meme"
import {Routes , Route} from "react-router-dom";
import { MemeGenerated } from "../MemeGenerated/MemeGenerated";

export const  App = () =>{
  return (
    <Routes>
      <Route exact path="/" element={ <Meme />} />
      <Route exact path="/generated" element={ <MemeGenerated />} />
    </Routes>
      
    
  );
}

