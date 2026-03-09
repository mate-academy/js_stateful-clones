'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let currentState = state;

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;
    let stateCopy = { ...currentState };

    switch (type) {
      case 'addProperties':
        Object.assign(stateCopy, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        break;
    }

    history.push(stateCopy);
    currentState = stateCopy;
  }

  return history;
}

module.exports = transformStateWithClones;
