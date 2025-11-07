'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let current = state;

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        current = {};
        break;

      case 'addProperties':
        current = {
          ...current,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        const stateCopy = { ...current };

        for (const key of action.keysToRemove) {
          if (key in stateCopy) {
            delete stateCopy[key];
          }
        }
        current = stateCopy;
        break;

      default:
        break;
    }
    history.push(current);
  }

  return history;
}

module.exports = transformStateWithClones;
