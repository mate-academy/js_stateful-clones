'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = [{ ...state }];

  for (const action of actions) {
    const copyExtraData = { ...action.extraData };
    const copyKeysToRemove = { ...action.keysToRemove };
    const copyLastStateClone
      = Object.assign({}, stateClone[stateClone.length - 1]);

    switch (action.type) {
      case 'addProperties' :
        Object.assign(copyLastStateClone, copyExtraData);

        stateClone.push(copyLastStateClone);

        break;

      case 'removeProperties' :
        for (const variable in copyKeysToRemove) {
          delete copyLastStateClone[copyKeysToRemove[variable]];
        }

        stateClone.push(copyLastStateClone);

        break;

      case 'clear' :
        stateClone.push({});
    }
  }

  const returnStateClone = stateClone.slice(1);

  return returnStateClone;
}

module.exports = transformStateWithClones;
