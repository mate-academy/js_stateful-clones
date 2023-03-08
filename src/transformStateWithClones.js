'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copyOfState = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        assignNewDataToState(copyOfState, action);
        result.push({ ...copyOfState });
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          deleteFromState(copyOfState, key);
        }
        result.push({ ...copyOfState });
        break;

      case 'clear':
        copyOfState = {};
        result.push({ ...copyOfState });
        break;
    }
  }

  return result;
}

function assignNewDataToState(newObj, action) {
  Object.assign(newObj, action.extraData);
}

function deleteFromState(newObj, key) {
  delete newObj[key];
}

module.exports = transformStateWithClones;
