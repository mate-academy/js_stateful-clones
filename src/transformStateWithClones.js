'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  return actions.reduce((acc, action, index) => {
    const statePrevious = index === 0 ? { ...state } : { ...acc[index - 1] };

    switch (action.type) {
      case 'addProperties':
        acc.push(Object.assign({}, statePrevious, action.extraData));
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete statePrevious[key];
        }
        acc.push(Object.assign({}, statePrevious));
        break;

      case 'clear':
        acc.push({});
        break;

      default:
        acc.push(Object.assign({}, statePrevious, { ERROR: action.type }));
    }

    return acc;
  }, []);
}

module.exports = transformStateWithClones;
