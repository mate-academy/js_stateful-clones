'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = { ...state };
  const result = [];

  for (let i = 0; i < actions.length; i++) {
    if (actions[i]['type'] === 'addProperties') {
      Object.assign(clone, actions[i]['extraData']);
    }

    if (actions[i]['type'] === 'removeProperties') {
      for (let x = 0; x < actions[i]['keysToRemove'].length; x++) {
        delete clone[actions[i]['keysToRemove'][x]];
      }
    }

    if (actions[i]['type'] === `clear`) {
      for (const key in clone) {
        delete clone[key];
      }
    }

    const clone2 = { ...clone };

    result.push(clone2);
  }

  return result;
}

module.exports = transformStateWithClones;
