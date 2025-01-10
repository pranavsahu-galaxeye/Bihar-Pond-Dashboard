
import PropTypes from "prop-types";
import { Popup } from "react-map-gl";

const InfoPopup = ({
  popupInfo,
  hoverInfo,
  handleGoogleMapsRedirect,
  onClose,
}) => {
  const info = popupInfo || hoverInfo;

  if (!info) return null;

  return (
    <Popup
      longitude={info.longitude}
      latitude={info.latitude}
      closeButton={!!popupInfo}
      closeOnClick={!!popupInfo}
      anchor="top"
      onClose={onClose}
    >
      <div>
        {info.isCluster ? (
          <p>Area: {info.area}</p>
        ) : (
          <>
            <p>State: {info.state}</p>
            <p>Subdistrict: {info.subdistrict}</p>
            <p>District: {info.district}</p>
            <p>Village: {info.village}</p>
            <p>Coordinates: {info.coordinates}</p>
            <p>Area: {info.area}</p>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-blue-700 hover:-translate-y-0.5 transform transition-all duration-300 text-sm"
              onClick={() =>
                handleGoogleMapsRedirect(info.longitude, info.latitude)
              }
            >
              Open in Google Maps
            </button>
          </>
        )}
      </div>
    </Popup>
  );
};

InfoPopup.propTypes = {
  popupInfo: PropTypes.object,
  hoverInfo: PropTypes.object,
  handleGoogleMapsRedirect: PropTypes.func.isRequired,
  onClose: PropTypes.func,
};

export default InfoPopup;
