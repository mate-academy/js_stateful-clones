'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const copyState = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copyState[key];
        }
        break;

      case 'clear':
        for (const key of Object.keys(copyState)) {
          delete copyState[key];
        }
        break;
    }

    const currentState = { ...copyState };
    result.push(currentState);
  }

  return result;
}

module.exports = transformStateWithClones;
