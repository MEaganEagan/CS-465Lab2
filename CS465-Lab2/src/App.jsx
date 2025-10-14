// AUTHOR - Matt Eagan
// FILE - App.jsx
// PROJECT - Lab 2
// COURSE - CS-465: Full-Stack Development
// INSTRUCTOR - Charles Palmer
// DUE DATE - 10/13/2025 

import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './App.css'

const position = [42.3555, -71.0565]

function App() {
  return (
    <>
      <header>
        <img src="/src/assets/menuicon.svg" id="MenuIcon"></img>
      </header>
      <div id = "map">
        <MapContainer center={position} zoom={6} minZoom={2.5} maxBounds={[[90,-180],[-90,180]]} scrollWheelZoom={true}>
          <TileLayer 
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
    </>
  )
}

export default App
