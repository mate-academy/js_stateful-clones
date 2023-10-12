'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClones = [ { ...state } ];

  for (const action of actions) {
    const stateClone = { ...stateClones[stateClones.length - 1] };

    if (action.type === 'addProperties') {
      for (const key in action.extraData) {
        stateClone[key] = action.extraData[key];
      }
    } else if (action.type === 'removeProperties') {
      for (const keyToRemove of action.keysToRemove) {
        delete stateClone[keyToRemove];
      }
    } else if (action.type === 'clear') {
      for (const key in stateClone) {
        delete stateClone[key];
      }
    }

    stateClones.push(stateClone);
  }

  return stateClones.slice(1);
}

module.exports = transformStateWithClones;
