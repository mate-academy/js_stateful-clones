'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateVirsions = [];
  const copyState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        stateVirsions.push(Object.assign({}, copyState));
        break;
      case 'removeProperties':
        for (const property of action.keysToRemove) {
          delete copyState[property];
        };
        stateVirsions.push(Object.assign({}, copyState));
        break;
      case 'clear':
        Object.keys(copyState).forEach(key => delete copyState[key]);
        stateVirsions.push({});
        break;
      default:
        break;
    }
  }

  return stateVirsions;
}

module.exports = transformStateWithClones;
