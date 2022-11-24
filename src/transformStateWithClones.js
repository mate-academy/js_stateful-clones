'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let backupObj = Object.assign({}, state);

  actions.forEach(action => {
    switch (action.type) {
      case 'addProperties':
        backupObj = { ...backupObj };
        Object.assign(backupObj, action.extraData);
        break;
      case 'removeProperties':
        backupObj = { ...backupObj };

        for (const key of action.keysToRemove) {
          delete backupObj[key];
        }
        break;

      case 'clear':
        backupObj = {};
    }

    result.push(backupObj);
  });

  return result;
}

module.exports = transformStateWithClones;
