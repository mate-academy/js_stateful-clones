'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const result = [ ];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties' :
        Object.assign(stateCopy, action.extraData);
        result.push({ ...stateCopy });
        break;

      case 'removeProperties' :
        for (const item of action.keysToRemove) {
          delete stateCopy[item];
        }
        result.push({ ...stateCopy });
        break;

      case 'clear' :
        for (const key of Object.keys(stateCopy)) {
          delete stateCopy[key];
        }
        result.push({ ...stateCopy });
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
