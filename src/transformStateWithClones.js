'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformState = [];
  const tempState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(tempState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete (tempState[key]);
        }
        break;

      case 'clear':
        for (const key in tempState) {
          delete (tempState[key]);
        }
        break;
    }

    transformState.push({ ...tempState });
  }

  return transformState;
}

module.exports = transformStateWithClones;
