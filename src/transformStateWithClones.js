'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  if (state === undefined || actions === undefined) {
    return;
  }

  const tmpState = structuredClone(state);
  const historyState = [];

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      for (const addkey in actions[i].extraData) {
        const newKey = { [addkey]: actions[i].extraData[addkey] };

        Object.assign(tmpState, newKey);
      }
    } else if (actions[i].type === 'removeProperties') {
      for (let j = 0; j < actions[i].keysToRemove.length; j++) {
        const remKey = actions[i].keysToRemove[j];

        try {
          if (Object.hasOwn(tmpState, remKey)) {
            delete tmpState[remKey];
          }
        } catch (e) {}
      }
    } else if (actions[i].type === 'clear') {
      for (const key in tmpState) {
        delete tmpState[key];
      }
    }

    const tmpObj = structuredClone(tmpState);

    historyState.push(tmpObj);
  }

  return historyState;
}

module.exports = transformStateWithClones;
