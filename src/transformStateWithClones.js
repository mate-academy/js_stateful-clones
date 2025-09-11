'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayClones = [];

  let currentState = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        const extraData =
          action.extraData && typeof action.extraData === 'object'
            ? action.extraData
            : {};

        const cloneAddingProperties = Object.assign(
          {},
          currentState,
          extraData,
        );

        currentState = cloneAddingProperties;
        break;

      case 'removeProperties':
        const cloneRemovedProperties = Object.assign({}, currentState);
        const keys = Array.isArray(action.keysToRemove)
          ? action.keysToRemove
          : [];

        for (const item of keys) {
          delete cloneRemovedProperties[item];
        }

        currentState = cloneRemovedProperties;
        break;
      case 'clear':
        currentState = {};
        break;
      default:
        throw new Error('Unknown action type: ' + action.type);
    }
    arrayClones.push(Object.assign({}, currentState));
  }

  return arrayClones;
}

module.exports = transformStateWithClones;
