'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let cloneState = { ...state };
  const newArray = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        cloneState = Object.assign(cloneState, actions[i].extraData);

        break;
      case 'removeProperties':
        for (let j = 0; j < actions[i].keysToRemove.length; j++) {
          delete cloneState[actions[i].keysToRemove[j]];
        }

        break;
      case 'clear':
        for (const key in cloneState) {
          delete cloneState[key];
        }
        break;
    }
    newArray.push({ ...cloneState });
  }

  return newArray;
}

module.exports = transformStateWithClones;
