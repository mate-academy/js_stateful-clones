'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const array = [];
  const stateO = structuredClone(state);

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        Object.keys(stateO).forEach((key) => delete stateO[key]);
        break;

      case 'addProperties':
        Object.assign(stateO, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach((key) => delete stateO[key]);
        break;
    }

    array.push(structuredClone(stateO));
  }

  return array;
}

module.exports = transformStateWithClones;
