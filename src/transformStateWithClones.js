'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copy = Object.assign({}, state);
  const copyHistory = [];

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        copy = Object.assign({}, copy, obj.extraData);
        break;

      case 'removeProperties':
        for (const key of obj.keysToRemove) {
          delete copy[key];
        }
        break;

      case 'clear':
        copy = {};
        break;
    }

    copyHistory.push(Object.assign({}, copy));
  }

  return copyHistory;
}

module.exports = transformStateWithClones;
