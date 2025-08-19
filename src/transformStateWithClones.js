'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let prevState = Object.assign({}, state);

  actions.forEach((action) => {
    let newState;

    if (action.type === 'addProperties') {
      newState = Object.assign({}, prevState, action.extraData);
    } else if (action.type === 'removeProperties') {
      newState = Object.assign({}, prevState);

      action.keysToRemove.forEach((key) => {
        delete newState[key];
      });
    } else if (action.type === 'clear') {
      newState = {};
    }
    history.push(newState);
    prevState = newState;
  });

  return history;
}

module.exports = transformStateWithClones;
