'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const originalObj = Object.assign({}, state);
  const res = [];

  for (const action in actions) {
    const operation = actions[action];

    switch (operation.type) {
      case 'addProperties':
        Object.assign(originalObj, operation.extraData);
        break;

      case 'removeProperties':
        for (const key of operation.keysToRemove) {
          delete originalObj[key];
        }
        break;

      case 'clear':
        for (const key in originalObj) {
          delete originalObj[key];
        }
    }

    res.push(Object.assign({}, originalObj));
  }

  return res;
}

module.exports = transformStateWithClones;
