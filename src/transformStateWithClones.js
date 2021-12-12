'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let CloneState = { ...state };
  const newArray = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        CloneState = Object.assign(CloneState, actions[i].extraData);

        break;
      case 'removeProperties':
        for (let j = 0; j < actions[i].keysToRemove.length; j++) {
          delete CloneState[actions[i].keysToRemove[j]];
        }

        break;
      case 'clear':
        for (const key in CloneState) {
          delete CloneState[key];
        }
        break;
    }
    newArray.push({ ...CloneState });
  }

  return newArray;
}

module.exports = transformStateWithClones;
