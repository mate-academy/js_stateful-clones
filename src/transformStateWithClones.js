'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const StateCopy = { ...state };
  const EmptyArray = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(StateCopy, action.extraData);
        EmptyArray.push(Object.assign({}, StateCopy));
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete StateCopy[key];
        }
        EmptyArray.push(Object.assign({}, StateCopy));
        break;

      case 'clear':
        for (const StateKey in StateCopy) {
          if (StateCopy.hasOwnProperty(StateKey)) {
            delete StateCopy[StateKey];
          };
        }
        EmptyArray.push(Object.assign({}, StateCopy));
        break;

      default:
        return 'Whoops, something bad happened';
    }
  }

  return EmptyArray;
}

module.exports = transformStateWithClones;
