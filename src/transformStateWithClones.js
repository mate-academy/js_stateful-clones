'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];
  const status = { ...state };
  const ActionsTipes = {
    AddProperties: 'addProperties',
    RemoveProperties: 'removeProperties',
    Clear: 'clear',
  };

  for (const value of actions) {
    switch (value.type) {
      case ActionsTipes.AddProperties :
        for (const keyToAdd in value.extraData) {
          status[keyToAdd] = value.extraData[keyToAdd];
        }
        break;
      case ActionsTipes.RemoveProperties :
        for (
          let keyToRemove = 0;
          keyToRemove < value.keysToRemove.length;
          keyToRemove++
        ) {
          delete status[value.keysToRemove[keyToRemove]];
        }
        break;
      case ActionsTipes.Clear :
        for (const keyClear in status) {
          delete status[keyClear];
        }
        break;
      default:
        return 'Error, actions dont right.';
    }

    res.push({ ...status });
  }

  return res;
}

module.exports = transformStateWithClones;
