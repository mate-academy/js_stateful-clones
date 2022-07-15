'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let cloneState = { ...state };
  const arrayState = [];

  for (const property of actions) {
    if (property.type === 'addProperties') {
      const addPropertiesObject = {};

      for (const key in property.extraData) {
        addPropertiesObject[key] = property.extraData[key];
      }

      const addCloneState = {
        ...cloneState,
        ...addPropertiesObject,
      };

      arrayState.push(addCloneState);
      cloneState = { ...addCloneState };
    }

    if (property.type === 'removeProperties') {
      const removeObject = { ...cloneState };

      for (const keyremove of property.keysToRemove) {
        if (keyremove in removeObject) {
          delete removeObject[keyremove];
        }
      }

      arrayState.push(removeObject);
      cloneState = { ...removeObject };
    }

    if (property.type === 'clear') {
      const emplyObject = {};

      arrayState.push(emplyObject);
      cloneState = {};
    }
  }

  return arrayState;
}

module.exports = transformStateWithClones;
