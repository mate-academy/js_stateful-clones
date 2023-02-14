'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayOfObj = [];
  const stateCopy = { ...state };

  for (const act of actions) {
    switch (act.type) {
      case 'addProperties' :
        Object.assign(stateCopy, act.extraData);
        break;

      case 'removeProperties' :
        const arr = act.keysToRemove;

        for (const key of arr) {
          delete stateCopy[key];
        }
        break;

      case 'clear' :
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      default:
        break;
    }

    arrayOfObj.push({ ...stateCopy });
  }

  return arrayOfObj;
}

module.exports = transformStateWithClones;
