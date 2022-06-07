'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const arr = [];

  for (const j in actions) {
    const actionType = actions[j].type;

    switch (true) {
      case (actionType === 'addProperties'):
        Object.assign(stateCopy, actions[j].extraData);
        break;
      case (actionType === 'clear'):
        for (const key in stateCopy) {
          if (stateCopy.hasOwnProperty(key)) {
            delete stateCopy[key];
          }
        }
        break;
      case (actionType === 'removeProperties'):
        for (const key in stateCopy) {
          for (let p = 0; p < actions[j].keysToRemove.length; p++) {
            if (actions[j].keysToRemove[p] === key) {
              delete stateCopy[key];
            }
          }
        }
        break;
    }
    arr.push({ ...stateCopy });
  }

  return arr;
}

module.exports = transformStateWithClones;
