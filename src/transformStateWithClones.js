'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here

  const ret = [];

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    const workState = { ...state };
    let extraData = {};

    switch (action.type) {
      case 'addProperties':
        extraData = action.extraData;

        for (const key in extraData) {
          workState[key] = extraData[key];
        }
        break;

      case 'removeProperties':
        for (let j = 0; j < action.keysToRemove.length; j++) {
          const remove = action.keysToRemove[j];

          if (Object.hasOwn(workState, remove)) {
            delete workState[remove];
          }
        }
        break;
      case 'clear':
        for (const key in workState) {
          delete workState[key];
        }
        break;
    }

    ret.push({ ...workState });
  }

  return ret;
}

module.exports = transformStateWithClones;
