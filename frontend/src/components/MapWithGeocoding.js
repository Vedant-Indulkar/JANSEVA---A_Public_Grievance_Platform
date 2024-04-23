import React, { useState, useEffect } from 'react';

const MapWithGeocoding = ({ onLocationSelect, address, setAddress }) => {
  // const [address, setAddress] = useState('');
  const [mapLoaded, setMapLoaded] = useState(false);
  const [locationSelected, setLocationSelected] = useState(false);
  let map;

  useEffect(() => {
    if (window.google && !mapLoaded) {
      initializeMap();
    }
  }, [mapLoaded]);

  const initializeMap = () => {
    const google = window.google;
    const geocoder = new google.maps.Geocoder();
    const latlng = new google.maps.LatLng(19.1590, 72.9986);
    const mapOptions = {
      zoom: 8,
      center: latlng,
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    const newMarker = new google.maps.Marker({
      position: latlng,
      map: map,
      draggable: !locationSelected,
      icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
    });

    newMarker.addListener('dragend', function () {
      if (!locationSelected) {
        geocoder.geocode({ 'location': newMarker.getPosition() }, function (results, status) {
          if (status === 'OK') {
            setAddress(results[0].formatted_address);
          } else {
            console.error('Cannot determine address at this location.');
          }
        });
      }
    });

    setMapLoaded(true);
  };

  const codeAddress = () => {
    const google = window.google;
    const geocoder = new google.maps.Geocoder();
  
    geocoder.geocode({ 'address': address }, (results, status) => {
      if (status === 'OK') {
        const location = results[0].geometry.location;
  
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 14,
          center: location,
        });
  
        setLocationSelected(true);

           // Create a circle with a red background color around the selected location
      const circle = new google.maps.Circle({
        map: map,
        radius: 500, // 500 meters radius
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        strokeWeight: 0,
        center: location
      });

  
        performNearbySearch(location);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  };

  const performNearbySearch = (location) => {
    const google = window.google;
    const service = new google.maps.places.PlacesService(map);

    const types = ['hospital', 'school', 'university', 'college'];
    let hospitalsCount = 0;
    let schoolsCollegesCount = 0;

    types.forEach(type => {
      const request = {
        location: location,
        radius: '500',
        type: [type],
      };

      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          results.forEach(place => {
            createMarker(place, type);
          });

          // Update counts based on place types and pass them to the parent component
          if (type === 'hospital') {
            hospitalsCount += results.length;
          } else if (['school', 'university', 'college'].includes(type)) {
            schoolsCollegesCount += results.length;
          }
        }

        if (type === 'college') {
          onLocationSelect(location.lat(), location.lng(), hospitalsCount, schoolsCollegesCount);
        }
      });
    });
  };


  const createMarker = (place, type) => {
    const google = window.google;
    let iconUrl;

    switch (type) {
      case 'hospital':
        iconUrl = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
        break;
      case 'school':
      case 'college':
      case 'university':
        iconUrl = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
        break;
      default:
        iconUrl = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
    }

    const marker = new google.maps.Marker({
      position: place.geometry.location,
      map: map,
      title: place.name,
      icon: iconUrl
    });
  };

  return window.google ? (
    <div>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
      <div>
        <input
          className='my-2'
          type="textbox"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          disabled={locationSelected}
        />
        <button onClick={codeAddress} disabled={locationSelected} className='mx-2 btn btn-dark'>Submit Location</button>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default MapWithGeocoding;
