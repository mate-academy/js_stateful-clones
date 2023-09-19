'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateModified = [];
  const stateObject = { ...state };

  for (const obj of actions) {
    for (const key in obj) {
      if (obj[key] === 'addProperties') {
        Object.assign(stateObject, obj.extraData);

        const addedObject = { ...stateObject };

        stateModified.push(addedObject);
      }

      if (obj[key] === 'removeProperties') {
        obj.keysToRemove.forEach(e => delete stateObject[e]);

        const removedObject = { ...stateObject };

        stateModified.push(removedObject);
      }

      if (obj[key] === 'clear') {
        for (const variableKey in stateObject) {
          if (stateObject.hasOwnProperty(variableKey)) {
            delete stateObject[variableKey];
          }
        }

        const clearedObject = { ...stateObject };

        stateModified.push(clearedObject);
      }
    }
  }

  return stateModified;
}

module.exports = transformStateWithClones;
