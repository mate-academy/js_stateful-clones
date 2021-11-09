'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const anwser = [];
  const copyOfState = { ...state };

  for (const actionObjects of actions) {
    switch (actionObjects.type) {
      case 'addProperties':
        for (const data in actionObjects.extraData) {
          copyOfState[data] = actionObjects.extraData[data];
        }

        break;
      case 'removeProperties':
        for (const aKeyToRemove of actionObjects.keysToRemove) {
          if (aKeyToRemove in copyOfState) {
            delete copyOfState[aKeyToRemove];
          }
        }

        break;
      case 'clear':
        for (const stateKey in copyOfState) {
          delete copyOfState[stateKey];
        }
        break;
    }

    const copyBeforePushing = { ...copyOfState };

    anwser.push(copyBeforePushing);
  }

  return anwser;
}

module.exports = transformStateWithClones;
