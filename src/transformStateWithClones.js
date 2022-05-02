'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];
  const copy = Object.assign({}, state);

  for (const partAction of actions) {
    switch (partAction.type) {
      case 'addProperties':
        Object.assign(copy, partAction.extraData);
        break;

      case 'removeProperties':
        for (const key of partAction.keysToRemove) {
          delete copy[key];
        }
        break;

      case 'clear':
        for (const key in copy) {
          delete copy[key];
        }
        break;
    }

    res.push({ ...copy });
  }

  return res;
}

module.exports = transformStateWithClones;
