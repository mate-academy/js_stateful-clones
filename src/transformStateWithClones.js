'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let nextState = { ...state };
  const result = [];

  for (const action of actions) {
    nextState = { ...nextState };
    result.push(nextState);

    switch (action.type) {
      case 'addProperties':
        Object.assign(nextState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete nextState[key];
        }
        break;

      case 'clear':
        for (const key in nextState) {
          delete nextState[key];
        }
    }
  }

  return result;
}

module.exports = transformStateWithClones;
