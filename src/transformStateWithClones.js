'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
/**
 * @param {Object} state
 * @param {Object[]} actions
 */
function transformStateWithClones(state, actions) {
  return actions.reduce((history, action, index) => {
    let newState = index === 0 ? { ...state } : { ...history[index - 1] };

    if (action.type && action.type !== '') {
      switch (action.type) {
        case 'clear':
          newState = {};
          break;
        case 'addProperties':
          if (!action.extraData) {
            throw new Error('Missing extraData type in addProperties action.');
          }
          Object.assign(newState, action.extraData);
          break;
        case 'removeProperties':
          if (!action.keysToRemove) {
            throw new Error(
              'Missing keysToRemove type in removeProperties action.',
            );
          }

          if (Array.isArray(action.keysToRemove)) {
            action.keysToRemove.forEach((key) => delete newState[key]);
          }
          break;
        default:
          throw new Error(`Unsupported action type: ${action.type}`);
      }
    } else {
      throw new Error('Action type must be provided and non-empty!');
    }

    return [...history, { ...newState }];
  }, []);
}

module.exports = transformStateWithClones;
