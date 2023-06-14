'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = [{ ...state }];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        stateCopy.push(
          Object.assign(
            {},
            stateCopy[stateCopy.length - 1],
            action['extraData']
          )
        );
        break;

      case 'removeProperties':
        const allProperties = {};

        Object.assign(allProperties, stateCopy[stateCopy.length - 1]);

        for (const property of action['keysToRemove']) {
          delete allProperties[property];
        }

        stateCopy.push(allProperties);
        break;

      case 'clear':
        stateCopy.push({});
        break;

      default:
        throw new Error('Invalid Action Name');
    }
  }

  stateCopy.shift();

  return stateCopy;
}

module.exports = transformStateWithClones;
