'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const propertiesData = [];
  const tempObject = { ...state };

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        Object.assign(tempObject, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          if (tempObject.hasOwnProperty(key)) {
            delete tempObject[key];
          }
        }
        break;

      case 'clear':
        for (const key in tempObject) {
          delete tempObject[key];
        }
    }

    propertiesData.push({ ...tempObject });
  }

  return propertiesData;
}

module.exports = transformStateWithClones;
