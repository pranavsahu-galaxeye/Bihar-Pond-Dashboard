export const adjustCoordinatesToIndia = (geojsonData) => {
  const withinBounds = (lon, lat) => {
    const newLon = lon < 68 ? 68 : lon > 98 ? 98 : lon;
    const newLat = lat < 8 ? 8 : lat > 37 ? 37 : lat;
    return [newLon, newLat];
  };

  const adjustedFeatures = geojsonData.features.map((feature) => {
    const [lon, lat] = feature.geometry.coordinates;
    const [newLon, newLat] = withinBounds(lon, lat);
    return {
      ...feature,
      geometry: {
        ...feature.geometry,
        coordinates: [newLon, newLat],
      },
    };
  });

  return {
    ...geojsonData,
    features: adjustedFeatures,
  };
};

export const formatArea = (area) => {
  return `${Number(area).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} Ha`;
};

export const formatCoordinates = (lng, lat) => {
  return `${lng.toFixed(2)}, ${lat.toFixed(2)}`;
};
