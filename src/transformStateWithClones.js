'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = clone(state);
  const history = [];

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];

    if (action.type === 'clear') {
      currentState = {};
    } else if (action.type === 'addProperties') {
      const extra = action.extraData;

      for (const key in extra) {
        currentState[key] = extra[key];
      }
    } else if (action.type === 'removeProperties') {
      const keys = action.keysToRemove;

      for (const key of keys) {
        delete currentState[key];
      }
    }

    history.push(clone(currentState));
  }

  return history;
}

function clone(obj) {
  const newObj = {};

  for (const key in obj) {
    newObj[key] = obj[key];
  }

  return newObj;
}

module.exports = transformStateWithClones;
