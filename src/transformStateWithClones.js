'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let cloneState = { ...state };
  const changeList = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(cloneState, action.extraData);
        break;

      case 'removeProperties':
        for (const keys of action.keysToRemove) {
          if (!cloneState.keys) {
            delete cloneState[keys];
          }
        }
        break;

      case 'clear':
        cloneState = {};
    }

    changeList.push({ ...cloneState });
  }

  return changeList;
}

module.exports = transformStateWithClones;
