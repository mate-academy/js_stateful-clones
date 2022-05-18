'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];
  const copy = { ...state };
  let innerCopy;

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        for (const keyState in copy) {
          delete copy[keyState];
        }
        innerCopy = { ...copy };
        res.push(innerCopy);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copy[key];
        }
        innerCopy = { ...copy };
        res.push(innerCopy);
        break;
      case 'addProperties':
        Object.assign(copy, action.extraData);
        innerCopy = { ...copy };
        res.push(innerCopy);
        break;
    }
  }

  return res;
}

module.exports = transformStateWithClones;
