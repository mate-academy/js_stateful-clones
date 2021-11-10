'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copy = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case
        'addProperties':
        Object.assign(copy, action.extraData);
        break;

      case
        'removeProperties':
        for (const keys of action.keysToRemove) {
          delete copy[keys];
        };
        break;

      case
        'clear':
        for (const i in copy) {
          delete copy[i];
        }
    }
    result.push({ ...copy });
  }

  return result;
}

module.exports = transformStateWithClones;
