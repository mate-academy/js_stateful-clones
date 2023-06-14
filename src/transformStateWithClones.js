'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = [];
  let allProperties = {};

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        if (stateCopy.length === 0) {
          stateCopy.push(Object.assign({}, state, action['extraData']));
        } else {
          stateCopy.push(
            Object.assign({},
              stateCopy[stateCopy.length - 1],
              action['extraData'])
          );
        }
        break;

      case 'removeProperties':
        if (stateCopy.length === 0) {
          Object.assign(allProperties, state);
        } else {
          Object.assign(allProperties, stateCopy[stateCopy.length - 1]);
        }

        for (const property of action['keysToRemove']) {
          delete allProperties[property];
        }

        stateCopy.push(allProperties);
        allProperties = {};
        break;

      case 'clear':
        stateCopy.push({});
        break;

      default:
        throw new Error('Invalid Action Name');
    }
  }

  return stateCopy;
}

module.exports = transformStateWithClones;
