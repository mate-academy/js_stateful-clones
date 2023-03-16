'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statesArray = [];
  const stateCopy = JSON.parse(JSON.stringify(state));

  actions.forEach(action => {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach(key => delete stateCopy[key]);
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      default:
        throw new Error('Something went wrong!');
    }

    statesArray.push(JSON.parse(JSON.stringify(stateCopy)));
  });

  return statesArray;
}

module.exports = transformStateWithClones;
