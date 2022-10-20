'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  const copyState = { ...state };

  for (const action of actions) {
    const type = action.type; // string with type property
    const addValues = action.extraData; // object with extra data
    const removeValues = action.keysToRemove; // array with remove keys

    switch (type) {
      case 'addProperties':
        Object.assign(copyState, addValues);
        break;

      case 'removeProperties':
        for (const value of removeValues) {
          delete copyState[value];
        }
        break;

      case 'clear':
        for (const value in copyState) {
          delete copyState[value];
        }
        break;

      default:
        break;
    }

    states.push({ ...copyState });
  }

  return states;
}

module.exports = transformStateWithClones;
