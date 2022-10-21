'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function deleteAllProperties(state) {
  for (const key in state) {
    delete state[key];
  }
}

function transformStateWithClones(state, actions) {
  const arrayOfTransforms = [];
  const transformatedState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        (Object.assign(transformatedState, action.extraData));
        break;

      case `removeProperties`:
        for (const key of action.keysToRemove) {
          delete transformatedState[key];
        }
        break;

      case `clear`:
        deleteAllProperties(transformatedState);
        break;

      default:
    }

    arrayOfTransforms.push({ ...transformatedState });
  }

  return arrayOfTransforms;
}

module.exports = transformStateWithClones;
