'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformedState = [];
  const stateNew = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateNew, action.extraData);
        break;

      case 'removeProperties':
        const removeProp = action.keysToRemove;

        for (const prop of removeProp) {
          delete stateNew[prop];
        }
        break;

      default:
        for (const prop in stateNew) {
          delete stateNew[prop];
        }
    }

    const stateVers = { ...stateNew };

    transformedState.push(stateVers);
  }

  return transformedState;
}

module.exports = transformStateWithClones;
