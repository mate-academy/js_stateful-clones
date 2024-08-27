'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copy = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach((key) => delete stateCopy[key]);
        break;

      case 'clear':
        stateCopy = {};
        break;
    }
    copy.push({ ...stateCopy });
  }

  return copy;
}

module.exports = transformStateWithClones;
