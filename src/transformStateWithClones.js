'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const anwser = [];
  let copyOfState = { ...state };

  for (const actionObjects of actions) {
    const copyBeforePushing = { ...copyOfState };

    switch (actionObjects.type) {
      case 'addProperties':
        for (const data in actionObjects.extraData) {
          copyBeforePushing[data] = actionObjects.extraData[data];
        }

        anwser.push(copyBeforePushing);
        copyOfState = copyBeforePushing;
        break;
      case 'removeProperties':
        for (const aKeyToRemove of actionObjects.keysToRemove) {
          if (aKeyToRemove in copyOfState) {
            delete copyBeforePushing[aKeyToRemove];
          }
        }

        anwser.push(copyBeforePushing);
        copyOfState = copyBeforePushing;
        break; ;
      case 'clear':
        for (const stateKey in copyOfState) {
          delete copyBeforePushing[stateKey];
        }
        anwser.push(copyBeforePushing);
        copyOfState = copyBeforePushing;
        break;
    }
  }

  return anwser;
}

module.exports = transformStateWithClones;
