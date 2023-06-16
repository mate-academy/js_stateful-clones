'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newStateObj = { ...state };
  const resultState = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        for (const keyForClear in newStateObj) {
          delete newStateObj[keyForClear];
        }
        break;

      case 'removeProperties':
        for (const keyForRemove of action.keysToRemove) {
          delete newStateObj[keyForRemove];
        }
        break;

      case 'addProperties':
        Object.assign(newStateObj, action.extraData);
        break;

      default:
        return `
          whooops😲
          something went wrong, are u shure values wrote correctly?
          Please check it again.
          If thats still doesnt work, well thats work on my computer🙂
        `;
    }

    resultState.push({
      ...newStateObj,
    });
  }

  return resultState;
}

module.exports = transformStateWithClones;
