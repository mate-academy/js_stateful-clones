'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCloneObject = { ...state };
  const stateClones = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(stateCloneObject, action.extraData);
      stateClones.push({ ...stateCloneObject });
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete stateCloneObject[key];
      }

      stateClones.push({ ...stateCloneObject });
    }

    if (action.type === 'clear') {
      for (const key in stateCloneObject) {
        delete stateCloneObject[key];
      }

      stateClones.push({ ...stateCloneObject });
    }
  }

  return stateClones;
}

module.exports = transformStateWithClones;
