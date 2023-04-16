'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let stateClones = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateClones, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateClones[key];
        }
        break;
      case 'clear':
        stateClones = {};
        break;
    }
    result.push({ ...stateClones });
  }

  return result;
}

module.exports = transformStateWithClones;
