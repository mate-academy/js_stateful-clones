'use strict';

/*
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateEmpty = [];

  for (const action of actions) {
    const previousState =
      stateEmpty.length > 0 ? stateEmpty[stateEmpty.length - 1] : state;
    const newState = { ...previousState };

    switch (action.type) {
      case 'addProperties':
        stateEmpty.push(Object.assign(newState, action.extraData));
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        stateEmpty.push(newState);
        break;
      case 'clear':
        stateEmpty.push({});
        break;
      default:
        break;
    }
  }

  return stateEmpty;
}

module.exports = transformStateWithClones;
