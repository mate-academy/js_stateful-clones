'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const arr = [];
  let copyOfState = { ...state };

  for (const values of actions) {
    if (values.type === 'addProperties') {
      Object.assign(copyOfState, values.extraData);
      arr.push({ ...copyOfState });
    }

    if (values.type === 'removeProperties') {
      for (const keysToRemoveValues of values.keysToRemove) {
        for (const copyOfStateValues in copyOfState) {
          if (keysToRemoveValues === copyOfStateValues) {
            delete copyOfState[copyOfStateValues];
          }
        }
      }
      arr.push({ ...copyOfState });
    }

    if (values.type === 'clear') {
      copyOfState = {};
      arr.push({ ...copyOfState });
    }
  }

  return arr;
}

module.exports = transformStateWithClones;
