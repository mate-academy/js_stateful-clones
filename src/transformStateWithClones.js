'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let currentStateCopy = { ...state };

  for (const action of actions) {
    const nextStateCopy = { ...currentStateCopy };

    switch (action.type) {
      case 'addProperties':
        Object.assign(nextStateCopy, action.extraData);
        break;

      case 'removeProperties':
      case 'clear':
        if (action.type === 'removeProperties') {
          for (const key of action.keysToRemove) {
            delete nextStateCopy[key];
          }
        } else if (action.type === 'clear') {
          for (const key in nextStateCopy) {
            delete nextStateCopy[key];
          }
        }
        break;

      default:
        history.push(nextStateCopy);
        currentStateCopy = nextStateCopy;
        continue;
    }

    history.push(nextStateCopy);
    currentStateCopy = nextStateCopy;
  }

  return history;
}

module.exports = transformStateWithClones;
