'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformedState = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        for (const key of Object.keys(stateCopy)) {
          delete stateCopy[key];
        }
        break;

      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const data in action.keysToRemove) {
          delete stateCopy[action.keysToRemove[data]];
        }
        break;
    }

    transformedState.push({ ...stateCopy });
  }

  return transformedState;
}

module.exports = transformStateWithClones;
