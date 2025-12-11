'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let nextState = Object.assign({}, state);
  const HISTORY = [];

  for (const ACTION of actions) {
    switch (ACTION.type) {
      case 'addProperties':
        nextState = { ...nextState, ...ACTION.extraData };
        break;

      case 'removeProperties':
        const UPDATED_STATE = Object.assign({}, nextState);

        for (const KEY of ACTION.keysToRemove) {
          delete UPDATED_STATE[KEY];
        }
        nextState = UPDATED_STATE;
        break;

      case 'clear':
        nextState = {};
        break;

      default:
        throw new Error(`Unsupported action type: ${ACTION.type}`);
    }

    HISTORY.push(nextState);
  }

  return HISTORY;
}

module.exports = transformStateWithClones;
