'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const getObjectCopy = { ...state };
  const result = [];

  for (let objectIndex = 0; objectIndex < actions.length; objectIndex++) {
    const getArraysObject = actions[objectIndex];

    if (actions[objectIndex].type === 'addProperties') {
      for (const key in getArraysObject.extraData) {
        getObjectCopy[key] = getArraysObject.extraData[key];
      }
      result.push({ ...getObjectCopy });
    } else if (getArraysObject.type === 'removeProperties') {
      for (let keyIndex = 0; keyIndex < getArraysObject.keysToRemove.length;
        keyIndex++) {
        delete getObjectCopy[getArraysObject.keysToRemove[keyIndex]];
      }
      result.push({ ...getObjectCopy });
    } else if (getArraysObject.type === 'clear') {
      for (const key in getObjectCopy) {
        delete getObjectCopy[key];
      }
      result.push({ ...getObjectCopy });
    }
  }

  return result;
}

module.exports = transformStateWithClones;
