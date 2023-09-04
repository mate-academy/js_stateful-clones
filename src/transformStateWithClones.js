'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newCopy = { ...state };
  const newArray = [];

  const ADD_PROP = 'addProperties';
  const REMOVE_PROP = 'removeProperties';
  const CLEAR_PROP = 'clear';

  for (const action of actions) {
    let cloneState = { ...newCopy };

    switch (action.type) {
      case ADD_PROP:
        Object.assign(cloneState, action.extraData);

        break;

      case REMOVE_PROP: {
        for (const key of action.keysToRemove) {
          delete cloneState[key];
        }

        break;
      }

      case CLEAR_PROP: {
        cloneState = {};

        break;
      }
    }
    newArray.push(cloneState);
    newCopy = cloneState;
  }

  return newArray;
}

module.exports = transformStateWithClones;
