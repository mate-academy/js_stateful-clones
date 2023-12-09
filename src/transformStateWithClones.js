'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let INITIAL_STATE = { ...state };

  for (const action of actions) {
    const RESULT_ACTION = { ...INITIAL_STATE };

    switch (action.type) {
      case 'addProperties':
        Object.assign(RESULT_ACTION, action.extraData);
        break;

      case 'removeProperties':
        for (const value of action.keysToRemove) {
          delete RESULT_ACTION[value];
        }
        break;

      case 'clear':
        for (const key in RESULT_ACTION) {
          delete RESULT_ACTION[key];
        }
        break;
    }

    result.push(RESULT_ACTION);
    INITIAL_STATE = RESULT_ACTION;
  }

  return result;
}

module.exports = transformStateWithClones;
