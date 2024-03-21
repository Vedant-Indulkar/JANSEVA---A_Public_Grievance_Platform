import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = ({coordinates}) => {
  useEffect(() => {
    console.log(coordinates+"====");
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2FuaWthZGl4aXQiLCJhIjoiY2x0eTlrN2ZnMDdwZTJrbWsya3IybHV3ZSJ9.r5xlO1EStmpipY_H3uCKAw';
    console.log(JSON.stringify(coordinates))

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center:coordinates[0].lngLat, // Set the center coordinates of the map
      zoom: 14 // Set the zoom level
    });

    // Add markers to the map
    coordinates.forEach(({ name, lngLat, color }) => {
      const marker = new mapboxgl.Marker({ color })
        .setLngLat(lngLat)
        .addTo(map);

      // Create a popup for each marker
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`<h3>${name}</h3>`);

      // Attach the popup to the marker
      marker.setPopup(popup);
    });


    // Clean up the map when the component unmounts
    return () => map.remove();
  }, []);

  return (
    <div id="map" style={{ height: '500px', width: '500px' }} />
  );
};

export default Map;

