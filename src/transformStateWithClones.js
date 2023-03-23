'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const OriginalObj = Object.assign({}, state);
  const res = [];

  for (const action in actions) {
    const operation = actions[action];

    switch (operation.type) {
      case 'addProperties':
        Object.assign(OriginalObj, operation.extraData);
        res.push(Object.assign({}, OriginalObj));
        break;

      case 'removeProperties':
        for (const key of operation.keysToRemove) {
          delete OriginalObj[key];
        }
        res.push(Object.assign({}, OriginalObj));
        break;

      case 'clear':
        for (const key in OriginalObj) {
          delete OriginalObj[key];
        }
        res.push(Object.assign({}, OriginalObj));
    }
  }

  return res;
}

module.exports = transformStateWithClones;
