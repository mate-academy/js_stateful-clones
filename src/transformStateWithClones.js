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

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(copyState, actions[i].extraData);
        break;

      case 'removeProperties':
        for (const keyRm of actions[i].keysToRemove) {
          delete copyState[keyRm];
        };
        break;

      default:
        for (const key in copyState) {
          delete copyState[key];
        };
        break;
    }

    const ObjectInResult = Object.assign({}, copyState);

    result.push(ObjectInResult);
  }

  return result;
}

module.exports = transformStateWithClones;
