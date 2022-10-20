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
        states.push(Object.assign({}, copyState));
        break;

      case 'removeProperties':
        for (const value of removeValues) {
          delete copyState[value];
        }
        states.push(Object.assign({}, copyState));
        break;

      case 'clear':
        for (const value in copyState) {
          delete copyState[value];
        }
        states.push(Object.assign({}, copyState));
        break;

      default:
        break;
    }
  }

  return states;
}

module.exports = transformStateWithClones;
