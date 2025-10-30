'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];

  for (const action of actions) {
    const prevState = result.length > 0 ? result[result.length - 1] : state;
    let nextState = { ...prevState };

    switch (action.type) {
      case 'addProperties':
        nextState = { ...nextState, ...action.extraData };
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete nextState[key];
        }
        break;

      case 'clear':
        nextState = {};
        break;

      default:
        continue;
    }

    result.push(nextState);
  }

  return result;
}

module.exports = transformStateWithClones;
