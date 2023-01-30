'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateDuplicate = { ...state };
  const transformedStates = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties': {
        addProps(stateDuplicate, extraData);
        break;
      }

      case 'removeProperties': {
        removeProps(stateDuplicate, keysToRemove);
        break;
      }

      case 'clear': {
        clearAll(stateDuplicate);
        break;
      }

      default: {
        return state;
      }
    }

    transformedStates.push({ ...stateDuplicate });
  }

  return transformedStates;
}

const addProps = function(myState, addThis) {
  Object.assign(myState, addThis);

  return myState;
};

const removeProps = function(myState, removeThis) {
  for (const item of removeThis) {
    delete myState[item];
  }

  return myState;
};

const clearAll = function(myState) {
  for (const key in myState) {
    delete myState[key];
  }

  return myState;
};

module.exports = transformStateWithClones;
