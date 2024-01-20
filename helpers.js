export const ready = (callbackFunction) =>{
  if(document.readyState === 'complete')
    callbackFunction(event)
  else
    document.addEventListener("DOMContentLoaded", callbackFunction)
}

export const getNewID = () => {
  return 'dtrm-xxxxxxxxxxxxxxxx-'
    .replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16)
  }) + Date.now()
}

export const getURLValues = (URL = window.location.href ) =>{
  const search_params = new URLSearchParams(URL)
  let options = {}
  for (const [key, unparsed_value] of search_params) {
    if(key !== window.location.origin + window.location.pathname + '?' ){
      try {
        const value = JSON.parse(decodeURI(unparsed_value))
        options[key] = value
      } catch {
        options[key] = decodeURI(unparsed_value)
      }
    }
  }
  return options
}

export function populateTemplate(dataObject, template) {
  // Get the template content as a string
  const templateContent = template.innerHTML;
  
  // Function to replace placeholders in the template with actual values from the dataObject
  const replacePlaceholders = (templateString, data) => {
    return templateString.replace(/\$\{(\w+)\}/g, (match, key) => {
      return typeof data[key] !== 'undefined' ? data[key] : match;
    });
  };
  
  // Populate the template
  const populatedTemplate = replacePlaceholders(templateContent, dataObject);
  
  return populatedTemplate;
}

export function describeGeoJSON(geojson){
    const geometryTypes = new Set();

    // Initialize structure to hold property ranges
    const propertyRanges = {};

    // Loop through the features
    geoJSON.features.forEach((feature) => {
      // Record the geometry type
      if (feature.geometry && feature.geometry.type) {
        geometryTypes.add(feature.geometry.type);
      }

      // Loop through the properties and record the ranges
      if (feature.properties) {
        Object.keys(feature.properties).forEach(key => {
          const value = feature.properties[key];
          if (typeof value === 'number') {
            if (!propertyRanges[key]) {
              propertyRanges[key] = { min: value, max: value };
            } else {
              if (value < propertyRanges[key].min) propertyRanges[key].min = value;
              if (value > propertyRanges[key].max) propertyRanges[key].max = value;
            }
          }
        });
      }
    });

    return { propertyRanges,geometryTypes }
}