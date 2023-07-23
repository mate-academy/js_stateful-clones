'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];

  actions.forEach((action) => {
    const stateCopy = Object.assign({}, state);

    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach((key) => delete stateCopy[key]);
        break;

      case 'clear':
        Object.keys(stateCopy).forEach((key) => delete stateCopy[key]);
        break;

      default:
        window.alert('Unknown action type: ' + action.type);
        break;
    }

    states.push(stateCopy);
  });

  return states;
}

module.exports = transformStateWithClones;
