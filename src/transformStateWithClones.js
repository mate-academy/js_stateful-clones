'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const statecopy = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(statecopy, action.extraData);
        result.push({ ...statecopy });
        // for (const key in action.extraData) {
        //   state[key] = action.extraData[key];
        // }
        break;

      case 'removeProperties':

        for (const key of action.keysToRemove) {
          delete statecopy[key];
        }
        result.push({ ...statecopy });
        break;

      case 'clear':

        for (const key in statecopy) {
          delete statecopy[key];
        }
        result.push({ ...statecopy });
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
