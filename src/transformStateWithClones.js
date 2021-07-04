'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];
  const temp = { ...state };

  for (const act of actions) {
    switch (act.type) {
      case 'addProperties':
        Object.assign(temp, act.extraData);
        break;

      case 'removeProperties':
        for (const keysRemove of act.keysToRemove) {
          delete temp[keysRemove];
        }
        break;

      case 'clear':
        for (const keyClear in temp) {
          delete temp[keyClear];
        }
    }

    res.push({ ...temp });
  }

  return res;
}

module.exports = transformStateWithClones;
