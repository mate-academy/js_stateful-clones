const library = {
  addProperties(stateObject, action) {
    for (const property in action.extraData) {
      stateObject[property] = action.extraData[property];
    }

    return stateObject;
  },

  removeProperties(stateObject, action) {
    for (const key of action.keysToRemove) {
      delete stateObject[key];
    }

    return stateObject;
  },

  clear(stateObject) {
    for (const property in stateObject) {
      delete stateObject[property];
    }

    return stateObject;
  },
};

module.exports = library;
