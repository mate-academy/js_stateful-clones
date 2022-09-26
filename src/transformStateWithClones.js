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
    switch (true) {
      case (action.type === 'addProperties'):
        Object.assign(clone, action.extraData);
        break;

      case (action.type === 'removeProperties'):
        for (const key of action.keysToRemove) {
          delete clone[key];
        }
        break;

      case (action.type === 'clear'):
        clone = {};
        break;

      default:
        break;
    }
    changeList.push({ ...clone });
  }

  return changeList;
}

module.exports = transformStateWithClones;
