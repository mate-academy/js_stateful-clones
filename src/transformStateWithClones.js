'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copy = { ...state };
  const res = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copy, action.extraData);
        break;

      case 'removeProperties' :
        for (const prop of action.keysToRemove) {
          delete copy[prop];
        }

        break;

      case 'clear' :
        copy = {};
        break;
    }
    res.push({ ...copy });
  }

  return res;
}
module.exports = transformStateWithClones;
