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
        const obj = Object.entries(action.extraData);

        for (let i = 0; i < obj.length; i++) {
          const element = obj[i];

          backupObj[element[0]] = element[1];
        }
        break;
      case 'removeProperties':
        for (let i = 0; i < action.keysToRemove.length; i++) {
          const element = action.keysToRemove[i];

          if (element in backupObj) {
            delete backupObj[element];
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
