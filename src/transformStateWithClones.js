'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];
  let obj = Object.assign({}, state);

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        obj = { ...obj, ...extraData };
        res.push(Object.assign({}, obj));
        break;

      case 'removeProperties':
        for (const removeElement of keysToRemove) {
          delete obj[removeElement];
        }
        res.push(Object.assign({}, obj));
        break;

      case 'clear':
        obj = {};
        res.push(Object.assign({}, obj));
        break;
    }
  }

  return res;
}

module.exports = transformStateWithClones;
