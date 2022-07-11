'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const modifiedObjects = [];
  let modifiedObject = Object.assign({}, state);

  for (const action of actions) {
    if (actions.length === 1) {
      modifiedObject = Object.assign({}, state);
    }

    switch (action.type) {
      case 'addProperties': {
        const propertiesToAdd = action.extraData;

        for (const property in propertiesToAdd) {
          modifiedObject[property] = propertiesToAdd[property];
        }
        break;
      }

      case 'removeProperties': {
        const keysToRemove = action.keysToRemove;

        for (const key of keysToRemove) {
          if (modifiedObject[key] !== undefined) {
            delete modifiedObject[key];
          }
        }
        break;
      }

      case 'clear': {
        for (const key in modifiedObject) {
          delete modifiedObject[key];
        }
        break;
      }
    }

    modifiedObjects.push(Object.assign({}, modifiedObject));
  }

  return modifiedObjects;
}

module.exports = transformStateWithClones;
