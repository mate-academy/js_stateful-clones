'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copyOfState = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        assignNewDataToState(copyOfState, action);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          deleteFromState(copyOfState, key);
        }
        break;

      case 'clear':
        copyOfState = {};
        break;
    }
    stateHistory.push({ ...copyOfState });
  }

  return stateHistory;
}

function assignNewDataToState(newObj, action) {
  Object.assign(newObj, action.extraData);
}

function deleteFromState(newObj, key) {
  delete newObj[key];
}

module.exports = transformStateWithClones;
