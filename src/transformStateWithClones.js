'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copyState = { ...state };
  const result = [];

  for (const action of actions) {
    const st = { ...copyState };

    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          st[key] = action.extraData[key];
        }
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete st[key];
        }
        break;

      case 'clear':
        for (const key in st) {
          delete st[key];
        }
        break;
    }

    copyState = st;
    result.push(st);
  }

  return result;
}

module.exports = transformStateWithClones;
