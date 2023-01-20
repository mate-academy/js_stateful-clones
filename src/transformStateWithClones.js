'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let copy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copy, action.extraData);
        break;

      case 'removeProperties':
        for (const item of action.keysToRemove) {
          delete copy[item];
        }
        break;

      case 'clear':
        copy = {};
    }

    result.push({ ...copy });
  }

  return result;
}

module.exports = transformStateWithClones;
