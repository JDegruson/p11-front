import React, { useRef, useState } from 'react';
import { GoogleMap, useLoadScript, Marker, StandaloneSearchBox, LoadScript } from '@react-google-maps/api';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

const libraries = ['places'];
const apiKey = 'AIzaSyCdawcAYPOV_peGZ3QYh7AFgo7jj5TakP0'; // Replace with your own Google Maps API key
const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};

const Address = () => {
  const inputRef = useRef();
  const [center, setCenter] = useState({ lat: 51, lng: 0 });

  const handlePlacesChanged = async () => {
    try {
      const [place] = await inputRef.current.getPlaces();
      if (place && place.geometry && place.geometry.location) {
        const newCenter = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setCenter(newCenter);
      }
    } catch (error) {
      console.error('Error handling places change:', error);
    }
  };

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={['places']}>
      <StandaloneSearchBox
        onLoad={ref => (inputRef.current = ref)}
        onPlacesChanged={handlePlacesChanged}
      >
        <input
          type='text'
          className='form-control'
          placeholder='Enter location'
        />
      </StandaloneSearchBox>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Address;
