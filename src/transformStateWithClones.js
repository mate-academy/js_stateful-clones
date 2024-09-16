'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyOfState = { ...state };
  const newArr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        const extraData = action.extraData;

        Object.assign(copyOfState, extraData);
        newArr.push({ ...copyOfState });
        continue;

      case 'removeProperties':
        const removedkeys = action.keysToRemove;

        for (const key of removedkeys) {
          delete copyOfState[key];
        }
        newArr.push({ ...copyOfState });
        continue;

      case 'clear':
        for (const key in copyOfState) {
          delete copyOfState[key];
        }
        newArr.push({ ...copyOfState });
        continue;
    }
  }

  return newArr;
}
module.exports = transformStateWithClones;
