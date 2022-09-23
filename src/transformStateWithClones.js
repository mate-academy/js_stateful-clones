'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let clone = {
    ...state,
  };
  const changeList = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(clone, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete clone[key];
      }
    }

    if (action.type === 'clear') {
      clone = {};
    }
    changeList.push({ ...clone });
  }

  return changeList;
}

module.exports = transformStateWithClones;
