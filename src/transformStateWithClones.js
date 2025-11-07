'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let startState = { ...state };
  const history = [];

  for (const action of actions) {
    let stateCopy = { ...startState };

    switch (action.type) {
      case 'addProperties':
        if (
          action.extraData &&
          typeof action.extraData === 'object' &&
          !Array.isArray(action.extraData)
        ) {
          stateCopy = { ...stateCopy, ...action.extraData };
        }
        break;

      case 'removeProperties':
        if (Array.isArray(action.keysToRemove)) {
          for (const key of action.keysToRemove) {
            delete stateCopy[key];
          }
        }
        break;
      case 'clear':
        stateCopy = {};
        break;
      default:
        break;
    }
    history.push({ ...stateCopy });
    startState = { ...stateCopy };
  }

  return history;
}

module.exports = transformStateWithClones;
