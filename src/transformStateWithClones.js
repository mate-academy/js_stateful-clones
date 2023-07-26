'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = deepClone(state);

  actions.forEach((action) => {
    if (action.type === 'addProperties') {
      // eslint-disable-next-line object-curly-newline
      currentState = { ...currentState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      action.keysToRemove.forEach((key) => {
        if (currentState.hasOwnProperty(key)) {
          delete currentState[key];
        }
      });
    } else if (action.type === 'clear') {
      currentState = {};
    }

    result.push(deepClone(currentState));
  });

  return result;
}

module.exports = transformStateWithClones;
