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
    RemoveProperties : 'removeProperties',
    Clear : 'clear'
  }

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case ActionsTipes.AddProperties :
        for (const keyToAdd in actions[i].extraData) {
          status[keyToAdd] = actions[i].extraData[keyToAdd];
        }
        break;
      case ActionsTipes.RemoveProperties :
        for (
          let keyToRemove = 0;
          keyToRemove < actions[i].keysToRemove.length;
          keyToRemove++
        ) {
          delete status[actions[i].keysToRemove[keyToRemove]];
        }
        break;
      case ActionsTipes.Clear :
        for (const keyClear in status) {
          delete status[keyClear];
        }
        break;
    }

    res.push({ ...status });
  }

  return res;
}

module.exports = transformStateWithClones;
