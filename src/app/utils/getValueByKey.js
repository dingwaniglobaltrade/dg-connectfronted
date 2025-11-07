export const getValueByKey = (obj, key) => {
  if (!obj || !key) return "";

  const keys = key.split("."); // split nested keys
  let result = obj;

  for (let k of keys) {
    if (result == null) return "";

    // If result is an array, map over it
    if (Array.isArray(result)) {
      // Collect the values from each object in array
      result = result.map((item) =>
        item != null && typeof item === "object" ? item[k] : item
      );
    } else {
      result = result[k];
    }
  }

  return result;
};
