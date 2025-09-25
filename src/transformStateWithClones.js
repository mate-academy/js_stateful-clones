'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        if (typeof action.extraData === 'object') {
          for (const key in action.extraData) {
            stateCopy[key] = action.extraData[key];
          }
        }
        break;
      case 'removeProperties':
        if (Array.isArray(action.keysToRemove)) {
          for (const remove of action.keysToRemove) {
            delete stateCopy[remove];
          }
        }
        break;
      case 'clear':
        stateCopy = {};
        break;
    }

    history.push({ ...stateCopy });
  }

  return history;
}

module.exports = transformStateWithClones;
