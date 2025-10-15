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
  const initPosition = [42.3555, -71.0565]; // Default LatLng upon load; Centers over Boston, MA, USA

  let noMarkers = 0; // Counter for number of created markers
  let currentIndex = 0; // Index for accessing markers

  const [markers, setMarkers] = useState([]); // Array of map markers for users to access
  const [newMarkerPos, setNewMarkerPos] = useState(null); // Temp values during marker creation while user enters text
  const [showModal, setShowModal] = useState(false); // States for input popups when creating a new marker
  const [showMarkerList, setShowMarkerList] = useState(false); //States for showing and hiding the list of created markers
  const [formData, setFormData] = useState({title: "", body: ""}); // Input states for new marker popups
  const [editMarker, setEditMarker] = useState(null); // States for editing an already existing marker

  // Functions to handle user interactions ***********************************************************
  const handleDblClick = (pos) => {
    setNewMarkerPos(pos);
    setShowModal(true);
  }

  const handleAddMarker = (markerData) => { // Handle index and info for a new marker
    if(editMarker !== null) { // Case for editing an existing marker
      setMarkers((prev) => 
        prev.map((thisMarker, index) => 
          index === editMarker ? {...thisMarker, title: formData.title, body: formData.body}: thisMarker
        )
      );
    }
    else{ // Case for creating a new marker
      setMarkers((prev) => [...prev, 
      {
        position: newMarkerPos,
        title: formData.title,
        body: formData.body
      }]);
    }

    // Reset marker creation states
    setFormData({title: "", body: ""});
    setNewMarkerPos(null);
    setShowModal(false);
  };

  const handleEditMarker = (index) => { //Allow user to edit created markers' information
    const marker = markers[index];
    setEditMarker(index);
    setFormData({ title: marker.title, body: marker.body });
    setShowModal(true);
  };

  const handleRemoveMarker = (removeIndex) => { // Handle index for a replaced marker
    setMarkers((prev) => prev.filter((_, index) => index !== removeIndex));
  };
  // *************************************************************************************************

  //Render objects on the webpage
  return (
    <>
      <div id = "map"> {/* Leaflet map display container */}
        <MapContainer id = "Lmap" center={initPosition} zoom={6} minZoom={2.5} maxBounds={[[90,-180],[-90,180]]} scrollWheelZoom={true} doubleClickZoom={false}>
          {/* Map initialized over Boston, MA with bounds preventing scrolling outside of mapped area */}
          <TileLayer 
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Continuously account for user actions */}
          <MapClickHandler 
            onAddMarker = {handleDblClick}
          />

          {/* Draw created markers on the map */}
          {markers.map((markerData, markerID) => (
            <Marker key = {markerID} position = {markerData.position} draggable = {true} autoPan = {true}
              eventHandlers={
                {
                  contextmenu: () => handleRemoveMarker(markerID), //Trigger remove on right click
                  dblclick: () => handleEditMarker(markerID) //Trigger edit on double click
                }
              }
            >
              <Popup>
                <b>{markerData.title}</b>
                <br/>
                {markerData.body}
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Button deletes all created markers */}
        <div id='resetButton'>
          <button id='markerReset' onClick={() => setMarkers([])}>
            RESET
          </button>
        </div>

        {/* Button displays a list of all created markers */}
        <div id='listButton'>
          <button id='listShow' onClick={() => setShowMarkerList(!showMarkerList)}>
            {showMarkerList ? "Hide List" : "Show List"}
          </button>
        </div>
      </div>

      {/* Popup form for users to submit marker info */}
      {showModal && ( 
        <div id='mapModalOverlay'> {/* Popup container and background gradient */}
          <div id='mapModal'> {/* Popup form display */}
            <h1>
              Add Marker 
            </h1>
            <form onSubmit={(event) => {
              event.preventDefault(); // Prevents the page from reloading upon submission
              handleAddMarker();
            }}>
              <label>
                Location 
                <input
                  className = "formInput"
                  type = 'text'
                  value = {formData.title}
                  onChange = {(text) => setFormData({...formData, title: text.target.value})}
                />
              </label>
              <label>
                Description
                <input
                  className = "formInput"
                  value = {formData.body}
                  onChange = {(text) => setFormData({...formData, body: text.target.value})}
                />
              </label>
              <div id='mapModalButtons'>
                <button id='createCancel' onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button id='createConfirm'>
                  Add Marker
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Popup list of all locations created by the user */}
      {showMarkerList && (
        <div id="markerListPanel">
          <h2>Oh the Places You've Been</h2>
          <h3>Your Locations</h3>
          {markers.length === 0 ? ( // Displays when the list is empty
            <p>
              Double-click to add locations
              <br/>
              Right-click to remove locations
            </p>
          ) : (
            <ul>
              {markers.map((marker, index) => ( // References each location in the array
                <li key={index} className="markerItem">
                  <b>{marker.title || `Marker ${index + 1}`}</b>
                  {marker.body && (
                    <>
                      <br />
                      <em>{marker.body}</em>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  )
}

export default App
