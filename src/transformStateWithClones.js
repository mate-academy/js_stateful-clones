'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const cloneState = Object.assign({}, state);
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(cloneState, action.extraData);
        break;

      case 'removeProperties':
        for (const propertyToBeRemoved of action.keysToRemove) {
          if (cloneState.hasOwnProperty(propertyToBeRemoved)) {
            delete cloneState[propertyToBeRemoved];
          }
        }
        break;

      case 'clear':
        for (const key in cloneState) {
          delete cloneState[key];
        }
        break;
    }

    result.push(Object.assign({}, cloneState));
  }

  return result;
}

module.exports = transformStateWithClones;
