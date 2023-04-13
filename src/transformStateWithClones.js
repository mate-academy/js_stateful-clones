'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const newStatePropertiesArray = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties' :
        Object.assign(newState, action.extraData);
        break;

      case 'removeProperties' :
        for (const type of action.keysToRemove) {
          delete newState[type];
        }
        break;

      case 'clear' :
        for (const del in newState) {
          delete newState[del];
        }
        break;
    }
    newStatePropertiesArray.push({ ...newState });
  }

  return newStatePropertiesArray;
}

module.exports = transformStateWithClones;
