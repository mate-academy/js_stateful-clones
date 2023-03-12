'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [Object.assign({}, state)];

  actions.forEach((action) => {
    let newState = Object.assign({}, result[result.length - 1]);

    switch (action.type) {
      case 'addProperties':
        newState = Object.assign({}, newState, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach((key) => {
          delete newState[key];
        });
        break;

      case 'clear':
        newState = {};
        break;
    }

    result.push(newState);
  });

  return result.slice(1);
}

module.exports = transformStateWithClones;
