import React, { useEffect, useState } from 'react';
import './App.css';
import ClinicFinder from "./components/ClinicFinder";

function App({ domElement }) {
  const lng = parseFloat(domElement.getAttribute("data-longitude"))
  const lat = parseFloat(domElement.getAttribute("data-latitude"))

    return(
        <div style={{'width': '100%', 'margin': 0}}>
            {(lat && lng) && <ClinicFinder lat={lat} lng={lng}/>}
        </div>
    )
}

export default App;
