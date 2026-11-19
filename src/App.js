import React from 'react';
import './App.css';
import ClinicFinder from './components/ClinicFinder';

function App({ domElement }) {
  const lng = parseFloat(domElement.getAttribute('data-longitude'));
  const lat = parseFloat(domElement.getAttribute('data-latitude'));
  const clinic = domElement.getAttribute('data-clinicname');
  const providedAt = domElement.getAttribute('data-provided-at');

  return (
    <div>
      {lat && lng && (
        <ClinicFinder
          lat={lat}
          lng={lng}
          clinic={clinic}
          providedAt={providedAt}
        />
      )}
    </div>
  );
}

export default App;
