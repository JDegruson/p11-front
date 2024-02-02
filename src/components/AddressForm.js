import React, { useRef, useState } from 'react';
import { GoogleMap, StandaloneSearchBox, LoadScript } from '@react-google-maps/api';
import FindHospitalButton from './FindHospitalButton';


const apiKey = 'AIzaSyCdawcAYPOV_peGZ3QYh7AFgo7jj5TakP0';
const mapContainerStyle = {
    width: '100vw',
    height: '100vh',
};

const Address = () => {
    const inputRef = useRef();
    const [center, setCenter] = useState({ lat: 51, lng: 0 });
    const [showFindHospitalButton, setShowFindHospitalButton] = useState(false);



    const handlePlacesChanged = async () => {
        try {
            const [place] = await inputRef.current.getPlaces();
            if (place && place.geometry && place.geometry.location) {
                const newCenter = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                };
                setCenter(newCenter);
                setShowFindHospitalButton(true);
            }
        } catch (error) {
            console.error('Error handling places change:', error);
        }
    };

    return (
        <div data-testid="address-form" >
        <LoadScript googleMapsApiKey={apiKey} libraries={['places']}>
            {showFindHospitalButton && (
                <div className="find-hospital-container">
                    <FindHospitalButton center={center} />
                </div>
            )}
            <StandaloneSearchBox
                onLoad={(ref) => (inputRef.current = ref)}
                onPlacesChanged={handlePlacesChanged}
            >
                <input
                    type='text'
                    className='form-control'
                    placeholder='Enter location'
                />
            </StandaloneSearchBox>

            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={10} center={center}></GoogleMap>
            </LoadScript>
            </div>
    );
};

export default Address;
