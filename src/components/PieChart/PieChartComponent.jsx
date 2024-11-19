import React, { useEffect, useState } from 'react';
import './ListComponent.css'; // Create a CSS file for styling

const ListComponent = ({ toggle }) => {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    // Fetch BIHAR_PONDS_MERGED GeoJSON data
    fetch('/BIHAR_PONDS_MERGED_POINT.geojson')
      .then((response) => response.json())
      .then((data) => {
        const districtCounts = {}; // To store pond counts
        const districtAreas = {}; // To store total areas

        data.features.forEach((feature) => {
          const district = feature.properties.DISTRICT || 'Unknown';
          const area = feature.properties.AREA || 0; // Ensure AREA is numeric

          districtCounts[district] = (districtCounts[district] || 0) + 1;
          districtAreas[district] = (districtAreas[district] || 0) + area;
        });

        // Prepare list data based on the toggle state
        const listData = Object.keys(districtCounts).map((district) => ({
          district,
          ponds: districtCounts[district],
          area: districtAreas[district],
        }));

        // Sort the list in descending order based on the selected metric
        listData.sort((a, b) =>
          toggle === 'area' ? b.area - a.area : b.ponds - a.ponds
        );

        setListData(listData);
      })
      .catch((error) => console.error('Error fetching GeoJSON data:', error));
  }, [toggle]);

  return (
    <div className="list-container">
      <div className="list-header">
        <span className="list-title">District</span>
        <span className="list-value">
          {toggle === 'area' ? 'Area (Ha)' : 'Ponds'}
        </span>
      </div>
      <div className="flex flex-col">
        {listData.map((item) => (
          <div key={item.district} className="flex justify-between">
            <div className="">{item.district}</div>
            <div className="">
              {toggle === 'area'
                ? item.area.toFixed(2) // Show area
                : item.ponds}          
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListComponent;
