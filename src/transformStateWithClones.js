'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(stateCopy, action.extraData);

        break;

      case 'removeProperties':
        removeProperties(stateCopy, action.keysToRemove);

        break;

      case 'clear':
        stateCopy = {};

        break;
    }
    result.push({ ...stateCopy });
  }

  return result;
}

function addProperties(stateCopy, extraData) {
  Object.assign(stateCopy, extraData);
}

function removeProperties(stateCopy, keysToRemove) {
  for (const key of keysToRemove) {
    delete stateCopy[key];
  }
}

module.exports = transformStateWithClones;
