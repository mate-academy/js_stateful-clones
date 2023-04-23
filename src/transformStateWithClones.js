'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const workState = { ...state };

  for (const action of actions) {
    const add = action.extraData;
    const remove = action.keysToRemove;

    switch (action.type) {
      case 'addProperties':
        for (const x in add) {
          workState[x] = add[x];
        }

        break;

      case 'removeProperties':
        for (const ch of remove) {
          if (ch in workState) {
            delete workState[ch];
          }
        }

        break;

      case 'clear':
        for (const del in workState) {
          delete workState[del];
        }

        break;
    }

    result.push({ ...workState });
  }

  return result;
}
module.exports = transformStateWithClones;
