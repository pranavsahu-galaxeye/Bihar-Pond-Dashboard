import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const ListComponent = ({ toggle }) => {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    // Fetch BIHAR_PONDS_MERGED GeoJSON data
    fetch("/BIHAR_PONDS_MERGED_POINT.geojson")
      .then((response) => response.json())
      .then((data) => {
        const districtCounts = {};
        const districtAreas = {};

        data.features.forEach((feature) => {
          const district = feature.properties.DISTRICT || "Unknown";
          const area = feature.properties.AREA || 0;

          districtCounts[district] = (districtCounts[district] || 0) + 1;
          districtAreas[district] = (districtAreas[district] || 0) + area;
        });

        let listData = Object.keys(districtCounts).map((district) => ({
          district,
          ponds: districtCounts[district],
          area: districtAreas[district],
        }));

        listData.sort((a, b) =>
          toggle === "area" ? b.area - a.area : b.ponds - a.ponds
        );

        if (listData.length > 4) {
          const topDistricts = listData.slice(0, listData.length - 4);
          const otherDistricts = listData.slice(listData.length - 4);

          const others = {
            district: "Others",
            ponds: otherDistricts.reduce((sum, item) => sum + item.ponds, 0),
            area: otherDistricts.reduce((sum, item) => sum + item.area, 0),
          };

          listData = [...topDistricts, others];
        }

        setListData(listData);
      })
      .catch((error) => console.error("Error fetching GeoJSON data:", error));
  }, [toggle]);

  return (
    <div className="mx-2 w-full max-h-[400px] overflow-x-auto overflow-y-scroll border-2 border-[#14DFAF] rounded-[6%] bg-transparent text-[#F2F2F2] p-3 mt-[5%] mb-2 scrollbar-hide ">
      <div className="flex justify-between font-bold mb-2 border-b-2 border-[#14dfaf] pb-1">
        <span className="list-title">District</span>
        <span className="list-value">
          {toggle === "area" ? "Area (Ha)" : "Ponds"}
        </span>
      </div>
      <div className="flex flex-col">
        {listData.map((item) => (
          <div key={item.district} className="flex justify-between ">
            <div className="">{item.district}</div>
            <div>{toggle === "area" ? item.area.toFixed(2) : item.ponds}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

ListComponent.propTypes = {
  toggle: PropTypes.oneOf(["ponds", "area"]).isRequired, // Ensures toggle is either 'ponds' or 'area'
};

export default ListComponent;
