'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const result = [];

  actions.forEach((action) => {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach((key) => delete stateCopy[key]);
        break;
      case 'clear':
        Object.keys(stateCopy).forEach((key) => delete stateCopy[key]);
        break;
    }

    result.push({ ...stateCopy });
  });

  return result;
}

module.exports = transformStateWithClones;
