'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const arrOfCopies = [];

  const ADD = 'addProperties';
  const REMOVE = 'removeProperties';
  const CLEAR = 'clear';

  for (const action of actions) {
    let cloneState = { ...newState };

    switch (action.type) {
      case ADD:
        Object.assign(cloneState, action.extraData);
        break;

      case REMOVE:
        for (const key of action.keysToRemove) {
          delete cloneState[key];
        }
        break;

      case CLEAR:
        cloneState = {};
        break;
    }
    arrOfCopies.push(cloneState);
    newState = cloneState;
  }

  return arrOfCopies;
}

module.exports = transformStateWithClones;
