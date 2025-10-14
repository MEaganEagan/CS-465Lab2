// AUTHOR - Matt Eagan
// FILE - App.jsx
// PROJECT - Lab 2
// COURSE - CS-465: Full-Stack Development
// INSTRUCTOR - Charles Palmer
// DUE DATE - 10/14/2025 

import { useState } from 'react'
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './App.css'

function MapClickHandler({onAddMarker}) {
  useMapEvents({
    dblclick(event) {
      onAddMarker(event.latlng); // Add a new marker and declare location at click location
    }
  })

  return null;
}

function App() {
  const position = [42.3555, -71.0565]; // Default LatLng upon load; Centers over Boston, MA, USA

  let noMarkers = 0; // Counter for number of created markers
  let currentIndex = 0; // Index for accessing markers

  const [markers, setMarkers] = useState([]); // Array of map markers for users to access

  // Functions to handle user interactions
  const handleAddMarker = (latlng) => { // Handle index for a new marker
    setMarkers((prev) => [...prev, latlng]);
  };

  const handleRemoveMarker = (removeIndex) => { // Handle index for a replaced marker
    setMarkers((prev) => prev.filter((_, index) => index !== removeIndex));
  };

  return (
    <>
      <header>
        <img src="/src/assets/menuicon.svg" id="MenuIcon"></img>
      </header>
      
      <div id = "map"> {/* Leaflet map display container */}
        <MapContainer id = "Lmap" center={position} zoom={6} minZoom={2.5} maxBounds={[[90,-180],[-90,180]]} scrollWheelZoom={true} doubleClickZoom={false}>
          {/* Map initialized over Boston, MA with bounds preventing scrolling outside of mapped area */}
          <TileLayer 
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Continuously account for user actions */}
          <MapClickHandler 
            onAddMarker = {handleAddMarker}
          />

          {/* Draw created markers on the map */}
          {markers.map((pos, markerID) => (
            <Marker key = {markerID} position = {pos} draggable = {true} 
              eventHandlers={
                {contextmenu: () => handleRemoveMarker(markerID)}
              }
            >
              <Popup>
                <b>Marker {markerID}</b><br />
                Right-Click to delete me
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </>
  )
}

export default App
