'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClones = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        stateCopy = Object.assign({}, stateCopy, action.extraData);
        break;

      case 'removeProperties':
        stateCopy = Object.keys(stateCopy).reduce((acc, key) => {
          if (!action.keysToRemove.includes(key)) {
            acc[key] = stateCopy[key];
          }

          return acc;
        }, {});
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        break;
    }

    stateClones.push({ ...stateCopy });
  }

  return stateClones;
}

module.exports = transformStateWithClones;
