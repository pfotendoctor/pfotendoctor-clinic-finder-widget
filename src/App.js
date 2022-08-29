import React, { useEffect, useState } from 'react';
import './App.css';
import ClinicFinder from "./components/ClinicFinder";

function App({ domElement }) {
  const lng = parseFloat(domElement.getAttribute("data-longitude"))
  const lat = parseFloat(domElement.getAttribute("data-latitude"))
  const clinic = domElement.getAttribute("data-clinic")
  const method = domElement.getAttribute("data-method")

    return(
        <div style={{'width': '100%', 'margin': 0}}>
            {(lat && lng) &&
                <ClinicFinder
                    lat={lat}
                    lng={lng}
                    clinic={clinic}
                    method={method}/>
            }
        </div>
    )
}

export default App;
