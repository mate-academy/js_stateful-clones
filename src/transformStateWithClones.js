'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyOfState = { ...state };
  const anwser = [];

  for (const actionObjects of actions) {
    for (const action in actionObjects) {
      if (actionObjects[action] === 'addProperties') {
        for (const data in actionObjects['extraData']) {
          copyOfState[data] = actionObjects['extraData'][data];
        }

        const copyBeforePushing = { ...copyOfState };

        anwser.push(copyBeforePushing);
      } else if (actionObjects[action] === 'removeProperties') {
        for (const aKeyToRemove of actionObjects['keysToRemove']) {
          for (const sts in copyOfState) {
            if (sts === aKeyToRemove) {
              delete copyOfState[sts];
            }
          }
        }

        const copyBeforePushing = { ...copyOfState };

        anwser.push(copyBeforePushing);
      } else if (actionObjects[action] === 'clear') {
        for (const sts in copyOfState) {
          delete copyOfState[sts];
        }

        const copyBeforePushing = { ...copyOfState };

        anwser.push(copyBeforePushing);
      }
    }
  }

  return anwser;
}

module.exports = transformStateWithClones;
