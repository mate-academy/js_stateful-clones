'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [state];

  for (let i = 0; i < actions.length; i++) {
    const prevState = result[i];
    let newState;

    switch (actions[i].type) {
      case 'addProperties':
        newState = Object.assign({}, prevState, actions[i].extraData);
        break;

      case 'removeProperties':
        newState = Object.assign({}, prevState);

        actions[i].keysToRemove.forEach((key) => {
          delete newState[key];
        });
        break;

      case 'clear':
        newState = {};
        break;

      default:
        newState = prevState;
    }

    result.push(newState);
  }

  return result.slice(1);
}

module.exports = transformStateWithClones;
