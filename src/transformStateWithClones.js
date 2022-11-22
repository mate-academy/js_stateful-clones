'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const backupObj = Object.assign({}, state);

  actions.forEach(action => {
    switch (action.type) {
      case 'addProperties':
        for (const element of Object.entries(action.extraData)) {
          backupObj[element[0]] = element[1];
        }
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (key in backupObj) {
            delete backupObj[key];
          }
        }
        break;

      case 'clear':
        for (const key in backupObj) {
          delete backupObj[key];
        }
    }
    result.push(Object.assign({}, backupObj));
  });

  return result;
}

module.exports = transformStateWithClones;
