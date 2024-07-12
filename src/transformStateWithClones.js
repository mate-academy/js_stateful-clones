'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let stateCopy = { ...state };

  const addProperties = (extraData) => {
    stateCopy = Object.assign(stateCopy, extraData);
  };

  const removeProperties = (keysToRemove) => {
    for (const remove of keysToRemove) {
      delete stateCopy[remove];
    }
  };

  const clear = () => {
    stateCopy = Object.assign({});
  };

  for (const keys in actions) {
    switch (actions[keys].type) {
      case 'addProperties':
        addProperties(actions[keys].extraData);
        break;
      case 'removeProperties':
        removeProperties(actions[keys].keysToRemove);
        break;
      case 'clear':
        clear();
        break;
    }
    stateHistory.push({ ...stateCopy });
  }

  return stateHistory;
}
module.exports = transformStateWithClones;
