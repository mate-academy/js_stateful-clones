'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  return actions.reduce(function (history, action, index) {
    const previousState =
      history.length > 0 ? history[history.length - 1] : state;
    let nextState;

    if (typeof action !== 'object' || action === null) {
      throw new Error('Action at index ' + index + ' must be an object');
    }

    switch (action.type) {
      case 'clear':
        nextState = {};
        break;

      case 'addProperties':
        if (
          typeof action.extraData !== 'object' ||
          action.extraData === null ||
          Array.isArray(action.extraData)
        ) {
          throw new Error(
            'extraData at index ' + index + ' must be a plain object',
          );
        }
        nextState = {};

        for (const key in previousState) {
          nextState[key] = previousState[key];
        }

        for (const key in action.extraData) {
          nextState[key] = action.extraData[key];
        }
        break;

      case 'removeProperties':
        if (!Array.isArray(action.keysToRemove)) {
          throw new Error(
            'keysToRemove at index ' + index + ' must be an array',
          );
        }
        nextState = {};

        for (const key in previousState) {
          if (!action.keysToRemove.includes(key)) {
            nextState[key] = previousState[key];
          }
        }
        break;

      default:
        throw new Error(
          'Unknown action.type at index ' + index + ': ' + action.type,
        );
    }

    history.push(nextState);

    return history;
  }, []);
}

module.exports = transformStateWithClones;
