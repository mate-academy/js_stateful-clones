'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClones = [];

  const transformState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(transformState, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete transformState[key];
        }
        break;
      case 'clear':
        for (const key in transformState) {
          delete transformState[key];
        }
        break;
    }
    stateClones.push({ ...transformState });
  }

  return stateClones;
}

module.exports = transformStateWithClones;
