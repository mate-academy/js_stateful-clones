'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateArray = [];

  const stateMod = {};

  Object.assign(stateMod, state);

  stateArray.push(stateMod);

  actions.forEach((action, i) => {
    const stateModIteration = {};

    Object.assign(stateModIteration, stateArray[i]);

    switch (action.type) {
      case 'addProperties':
        Object.assign(stateModIteration, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach(key => {
          delete stateModIteration[key];
        });
        break;

      case 'clear':
        for (const key in stateModIteration) {
          delete stateModIteration[key];
        }
        break;

      default:
        throw new Error('No action of such type yet');
    }

    stateArray.push(stateModIteration);
  });

  stateArray.shift();

  return stateArray;
}

module.exports = transformStateWithClones;
