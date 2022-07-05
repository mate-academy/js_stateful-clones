'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopies = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        if (stateCopies.length === 0) {
          stateCopies.push(Object.assign({}, state, extraData));
        } else {
          stateCopies.push(Object.assign(
            {}, stateCopies[stateCopies.length - 1], extraData));
        }
        break;

      case 'removeProperties':
        let stateCopy;

        if (stateCopies.length === 0) {
          stateCopy = { ...state };
        } else {
          stateCopy = { ...stateCopies[stateCopies.length - 1] };
        }

        for (const key of keysToRemove) {
          delete stateCopy[key];
        }

        stateCopies.push(stateCopy);
        break;

      case 'clear':
        stateCopies.push({});
        break;

      default:
        throw Error('There is no correct action');
    }
  }

  return stateCopies;
}

module.exports = transformStateWithClones;
