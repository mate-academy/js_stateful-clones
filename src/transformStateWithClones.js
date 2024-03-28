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
        break;

      case 'removeProperties':
        for (const removeElement of keysToRemove) {
          delete obj[removeElement];
        }
        break;

      case 'clear':
        obj = {};
        break;
    }
    res.push({ ...obj });
  }

  return res;
}

module.exports = transformStateWithClones;
