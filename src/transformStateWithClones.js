'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];

  function clone(source) {
    return { ...source };
  }

  let objCopy = clone(state);

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        for (const key in actions[i].extraData) {
          objCopy[key] = actions[i].extraData[key];
        }
        history.push(clone(objCopy));
        break;
      case 'removeProperties':
        for (let d = 0; d < actions[i].keysToRemove.length; d++) {
          delete objCopy[actions[i].keysToRemove[d]];
        }
        history.push(clone(objCopy));
        break;
      case 'clear':
        objCopy = {};
        history.push(clone(objCopy));
        break;
    }
  }

  return history;
}

module.exports = transformStateWithClones;
