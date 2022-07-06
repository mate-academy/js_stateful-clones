'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateArray = [];

  let stateMod = {};

  let i = 0;

  Object.assign(stateMod, state);

  stateArray.push(stateMod);

  actions.forEach(e => {
    
    let stateModIteration = {};

    Object.assign(stateModIteration, stateArray[i]);

    switch (e.type) {
      case 'addProperties': 
        Object.assign(stateModIteration, e.extraData);
        break;

      case 'removeProperties':
        e.keysToRemove.forEach(key => {
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
    i++;
  });

  stateArray.shift();

  return stateArray;
}

module.exports = transformStateWithClones;
