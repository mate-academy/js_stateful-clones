'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateClone = { ...state };
  const result = [];

  for (const action of actions) {
    stateClone = { ...stateClone };

    switch (action.type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateClone[key];
        }
        break;

      case 'clear':
        for (const prop in stateClone) {
          delete stateClone[prop];
        };
    }
    result.push(stateClone);
  }

  return result;
}

module.exports = transformStateWithClones;
