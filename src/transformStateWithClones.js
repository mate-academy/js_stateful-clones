'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];
  let copy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copy, action.extraData);
        break

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copy[key]
        }
        break;
      
      case 'clear':
        copy = {};
        break;
    }

    res.push({ ...copy });
  }

  return res;
}


module.exports = transformStateWithClones;
