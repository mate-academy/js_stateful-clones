'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = [state];

  actions.forEach(action => {
    let result = { ...stateCopy[stateCopy.length - 1] };

    switch (action.type) {
      case 'addProperties':
        Object.assign(result, action.extraData);
        break;

      case 'removeProperties':
        const remove = {};

        for (const [key, value] of Object.entries(result)) {
          if (!action.keysToRemove.includes(key)) {
            remove[key] = value;
          }
        }
        result = remove;
        break;

      case 'clear':
        result = {};
        break;

      default:
        result = {};
        break;
    }

    stateCopy.push(result);
  });

  return stateCopy.slice(1, stateCopy.length);
}

module.exports = transformStateWithClones;
