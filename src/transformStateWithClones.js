'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const result = [];

  for (const action of actions) {
    const type = action.type;

    switch (type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(key => delete copyState[key]);
        break;
      case 'clear':
        Object.keys(copyState).forEach(key => delete copyState[key]);
    }
    result.push({ ...copyState });
  }

  return result;
}

module.exports = transformStateWithClones;
