'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const resObjArr = [];
  const cloneState = Object.assign({}, state);

  for (const act of actions) {
    switch (act.type) {
      case 'addProperties':
        Object.assign(cloneState, act.extraData);
        break;

      case 'removeProperties':
        for (const ch of act.keysToRemove) {
          delete cloneState[ch];
        }
        break;

      case 'clear':
        Object.keys(cloneState).forEach(key => delete cloneState[key]);
        break;
    }

    resObjArr.push(Object.assign({}, cloneState));
  }

  return resObjArr;
}

module.exports = transformStateWithClones;
