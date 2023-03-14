'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrOfObjects = [];
  const copyState = Object.assign({}, state);

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        Object.assign(copyState, obj.extraData);
        break;
      case 'removeProperties':
        obj.keysToRemove.forEach(elem => delete copyState[elem]);
        break;

      case 'clear':
        toClearState(copyState);
        break;

      default:
        return null;
    }
    arrOfObjects.push({ ...copyState });
  }

  return arrOfObjects;
}

function toClearState(state) {
  for (const elem in state) {
    delete state[elem];
  }
}

module.exports = transformStateWithClones;
