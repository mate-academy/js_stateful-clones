'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];

  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        stateCopy = {};
        break;

      case 'addProperties':
        stateCopy = {
          ...stateCopy,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        stateCopy = Object.keys(stateCopy).reduce((acc, key) => {
          if (!action.keysToRemove.includes(key)) {
            acc[key] = stateCopy[key];
          }

          return acc;
        }, {});
        break;

      default:
        break;
    }

    history.push({ ...stateCopy });
  }

  return history;
}

module.exports = transformStateWithClones;
