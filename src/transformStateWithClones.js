'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneState = { ...state };
  const result = [];

  for (let i = 0; i < actions.length; i++) {
    if (actions[i]['type'] === 'addProperties') {
      Object.assign(cloneState, actions[i]['extraData']);
    }

    if (actions[i]['type'] === 'removeProperties') {
      for (let x = 0; x < actions[i]['keysToRemove'].length; x++) {
        delete cloneState[actions[i]['keysToRemove'][x]];
      }
    }

    if (actions[i]['type'] === `clear`) {
      for (const key in cloneState) {
        delete cloneState[key];
      }
    }

    const clone2 = { ...cloneState };

    result.push(clone2);
  }

  return result;
}

module.exports = transformStateWithClones;
