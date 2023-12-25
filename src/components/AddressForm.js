import React, { useRef, useState, useEffect } from 'react';
import { GoogleMap, Marker, StandaloneSearchBox, LoadScript } from '@react-google-maps/api';

const apiKey = 'AIzaSyCdawcAYPOV_peGZ3QYh7AFgo7jj5TakP0';
const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};

const Address = () => {
  const inputRef = useRef();
  const [center, setCenter] = useState({ lat: 51, lng: 0 });
  const [hospitals, setHospitals] = useState([]);


  const handlePlacesChanged = async () => {
    try {
      const [place] = await inputRef.current.getPlaces();
      if (place && place.geometry && place.geometry.location) {
        const newCenter = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setCenter(newCenter);
        fetchNearbyHospitals(newCenter);

      }
    } catch (error) {
      console.error('Error handling places change:', error);
    }
  };

  const fetchNearbyHospitals = async (location) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=5000&type=hospital&key=${apiKey}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch nearby hospitals');
      }

      const data = await response.json();
      const nearbyHospitals = data.results.slice(0, 5).map((result) => ({
        name: result.name,
        location: result.geometry.location,
      }));

      setHospitals(nearbyHospitals);
    } catch (error) {
      console.error('Error fetching nearby hospitals:', error);
    }
  };

  useEffect(() => {
    fetchNearbyHospitals(center);
  }, [center]);

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
        {hospitals.map((hospital, index) => (
          <Marker
            key={index}
            position={hospital.location}
            icon={{
              url: 'path/to/hospital-icon.png', // Replace with the path to your hospital icon
              scaledSize: new window.google.maps.Size(30, 30),
            }}
            title={hospital.name}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Address;
