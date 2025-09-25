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
        if (
          action.extraData &&
          typeof action.extraData === 'object' &&
          !Array.isArray(action.extraData)
        ) {
          for (const key in action.extraData) {
            if (Object.assign(stateCopy, action.extraData) === true) {
              continue;
            }
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
      default:
        throw new Error('Unknown action type: ' + action.type);
    }

    history.push({ ...stateCopy });
  }

  return history;
}

module.exports = transformStateWithClones;
