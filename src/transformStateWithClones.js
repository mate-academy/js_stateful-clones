'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let stateCopy = { ...state };

  const safeActions = Array.isArray(actions) ? actions : [];

  for (const action of safeActions) {
    switch (action.type) {
      case 'clear':
        stateCopy = {};
        break;
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
          stateCopy = { ...stateCopy };

          action.keysToRemove.forEach((key) => {
            delete stateCopy[key];
          });
        }
        break;
    }

    history.push({ ...stateCopy });
  }

  return history;
}

module.exports = transformStateWithClones;
