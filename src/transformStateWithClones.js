'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const newArray = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        newState = Object.assign(newState, actions[i].extraData);

        break;
      case 'removeProperties':
        for (let j = 0; j < actions[i].keysToRemove.length; j++) {
          delete newState[actions[i].keysToRemove[j]];
        }

        break;
      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        break;
    }
    newArray.push({ ...newState });
  }

  return newArray;
}

module.exports = transformStateWithClones;
