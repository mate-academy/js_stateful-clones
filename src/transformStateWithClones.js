'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformHistory = [];
  const stateCopy = { ...state };

  // for (let i = 0; i < actions.length; i++) {
  //   if (actions[i].type === 'removeProperties') {
  //     for (const removeKey of actions[i].keysToRemove) {
  //       delete stateCopy[removeKey];
  //     }
  //     transformHistory.push({ ...stateCopy });
  //   }

  //   if (actions[i].type === 'clear') {
  //     // Object.keys(stateCopy).forEach((key) => delete state[key]);
  //     for (const variableKey in stateCopy) {
  //       if (stateCopy.hasOwnProperty(variableKey)) {
  //         delete stateCopy[variableKey];
  //       }
  //     }
  //     transformHistory.push({ ...stateCopy });
  //   }

  //   if (actions[i].type === 'addProperties') {
  //     Object.assign(stateCopy, actions[i].extraData);
  //     transformHistory.push({ ...stateCopy });
  //   }
  // }

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i].type;

    switch (action) {
      case 'addProperties':
        Object.assign(stateCopy, actions[i].extraData);
        break;

      case 'removeProperties':
        for (const removeKey of actions[i].keysToRemove) {
          delete stateCopy[removeKey];
        }
        break;

      case 'clear':
        for (const variableKey in stateCopy) {
          if (stateCopy.hasOwnProperty(variableKey)) {
            delete stateCopy[variableKey];
          }
        }
        break;

      default:
        break;
    }

    transformHistory.push({ ...stateCopy });
  }

  return transformHistory;
}

module.exports = transformStateWithClones;
