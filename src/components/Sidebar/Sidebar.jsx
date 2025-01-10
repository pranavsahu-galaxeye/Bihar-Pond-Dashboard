import { useState, useEffect } from "react";
import {  Slide, Box } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PieChartComponent from "../PieChart/PieChartComponent"; // Import the pie chart component

const Sidebar = () => {
  const [openSideBox, setOpenSideBox] = useState(false);
  const [toggle, setToggle] = useState("ponds");

  const [totalPonds, setTotalPonds] = useState(0);
  const [totalArea, setTotalArea] = useState(0);

  const onSideboxOpen = () => setOpenSideBox(true);
  const onSideboxClose = () => setOpenSideBox(false);

  useEffect(() => {
    const fetchGeoJsonData = async () => {
      try {
        const response = await fetch("/BIHAR_PONDS_MERGED_POINT.geojson");
        if (!response.ok) {
          throw new Error(`Failed to fetch GeoJSON: ${response.statusText}`);
        }
        const geoJson = await response.json();
        const totalPonds = geoJson.features.length;
        const totalArea = geoJson.features.reduce((sum, feature) => {
          const area = feature.properties.AREA || 0; // Use 0 if AREA is undefined
          return sum + area;
        }, 0);

        setTotalPonds(totalPonds);
        setTotalArea(totalArea);
      } catch (error) {
        console.error("Error fetching GeoJSON data:", error);
      }
    };

    fetchGeoJsonData();
  }, []);

  return (
    <div
      className={`absolute right-0  top-[90px] bottom-[10px] flex items-center justify-end rounded-[16px] pr-[12px] ${
        openSideBox ? "w-full max-w-[350px]" : "w-[40px]"
      }`}
    >
      <button
        aria-label="Open Sidebar"
        onClick={onSideboxOpen}
        className="flex justify-center items-center p-0 rounded-full bg-black absolute top-[5%] left-0 transform translate-y-[-50%] z-[400] text-[#f2f2f2] w-[40px] h-[40px]"
      >
        <ArrowBackIosNewIcon fontSize="small" />
      </button>

      <Slide direction="left" in={openSideBox} mountOnEnter unmountOnExit>
        <Box
          component="div"
          className={`flex flex-col items-center w-full max-w-[350px] p-2.5 rounded-[15px] relative h-full z-[1000] text-[#f2f2f2] bg-gradient-to-r from-[#121212] to-[#053C3A]`}
          style={{
           
            opacity: openSideBox ? 1 : 0,
           
          }}
        >
          <div className="flex items-center justify-center w-full mb-2">
            <button
              aria-label="Close Sidebar"
              onClick={onSideboxClose}
              className="p-2 border border-gray-400 rounded-[12px] bg-black/80 self-start mb-2 absolute top-[10px] left-[10px] text-[#f2f2f2] w-[40px] h-[40px]"
            >
              <ArrowForwardIosIcon />
            </button>
            <h2 className="text-white text-2xl">Summary</h2>
          </div>
          <div className="w-full py-4 px-2">
            <div className="flex justify-around w-full mb-5">
              <div className="inline-block p-4 rounded-[16px] m-2 text-center w-[45%] max-w-[200px] h-[90px] border-2 border-[#14DFAF] bg-[#f2f2f2]/[0.16]">
                <p className="text-xs">Total Ponds</p>
                <p className="text-lg font-bold">{totalPonds}</p>
              </div>
              <div className="inline-block p-4 rounded-[16px] m-2 text-center w-[45%] max-w-[200px] h-[90px] border-2 border-[#14DFAF] bg-[#f2f2f2]/[0.16]">
                <p className="text-xs">Total Area (in Ha)</p>
                <p className="text-lg font-bold">{totalArea.toFixed(2)}</p>
              </div>
            </div>
            <h1 className="text-center text-base font-semibold mb-5">
              Distribution Across the Region
            </h1>
            <div className="flex justify-center mb-3">
              <button
                onClick={() => setToggle("ponds")}
                className={`${
                  toggle === "ponds"
                    ? "bg-[#14DFAF] text-white"
                    : "bg-transparent text-white"
                } rounded-[12px] text-sm w-[80px] h-[35px] mr-1 flex items-center justify-center border transition-all duration-300 
      ${toggle !== "ponds" ? "border-transparent" : "border-[#14DFAF]"} 
      hover:bg-[#14DFAF] hover:text-white hover:border-[#14DFAF]`}
              >
                PONDS
              </button>
              <button
                onClick={() => setToggle("area")}
                className={`${
                  toggle === "area"
                    ? "bg-[#14DFAF] text-white"
                    : "bg-transparent text-white"
                } rounded-[12px] text-sm w-[80px] h-[35px] flex items-center justify-center border transition-all duration-300 
      ${toggle !== "area" ? "border-transparent" : "border-[#14DFAF]"} 
      hover:bg-[#14DFAF] hover:text-white hover:border-[#14DFAF]`}
              >
                AREA
              </button>
            </div>

            <div className="flex justify-center w-full">
              <PieChartComponent toggle={toggle} />
            </div>
          </div>
        </Box>
      </Slide>
    </div>
  );
};

export default Sidebar;
