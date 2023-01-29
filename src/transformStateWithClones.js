'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateDuplicate = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        addProps(stateDuplicate, action.extraData);
        break;
      }

      case 'removeProperties': {
        removeProps(stateDuplicate, action.keysToRemove);
        break;
      }

      case 'clear': {
        clearAll(stateDuplicate);
        break;
      }
    }

    result.push({ ...stateDuplicate });
  }

  return result;
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
