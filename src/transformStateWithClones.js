'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let status = Object.assign({}, state);
  const result = [];

  actions.forEach(action => {
    let newState = {};

    if (action.type === 'addProperties') {
      newState = Object.assign({}, status, action.extraData);
      Object.assign({}, status, action.extraData);
    } else if (action.type === 'removeProperties') {
      newState = Object.assign({}, status);

      action.keysToRemove.forEach(key => {
        if (Object.hasOwnProperty.call(status, key)) {
          delete newState[key];
        }
      });
    } else if (action.type === 'clear') {
      newState = {};
    }

    result.push(newState);
    status = newState;
  });

  return result;
}

module.exports = transformStateWithClones;
