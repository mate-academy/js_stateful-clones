'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {

  let res = [];
  let status = {...state};

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties' :
        for (const keyToAdd in actions[i].extraData) {
          status[keyToAdd] = actions[i].extraData[keyToAdd];
        }
        res.push({...status});
        break;
      case 'removeProperties' :
        for (
          let keyToRemove = 0;
          keyToRemove < actions[i].keysToRemove.length;
          keyToRemove++
        ) {
          delete status[actions[i].keysToRemove[keyToRemove]];
        }
        res.push({...status});
        break;
      case 'clear' :
        for (const keyClear in status) {
          delete status[keyClear];
        }
        res.push({...status});
        break;
    }
  }

  return res;
}

module.exports = transformStateWithClones;
