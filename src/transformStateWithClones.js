'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const listArr = [];
  let listObg = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      for (const key in action.extraData) {
        listObg[key] = action.extraData[key];
      }
    } else if (action.type === 'removeProperties') {
      for (const remove of action.keysToRemove) {
        delete listObg[remove];
      }
    } else if (action.type === 'clear') {
      listObg = {};
    }

    listArr.push({ ...listObg });
  }

  return listArr;
}

module.exports = transformStateWithClones;
