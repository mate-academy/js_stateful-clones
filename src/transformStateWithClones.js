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

  for (const i of actions) {
    for (const key in i) {
      const add = i.extraData;
      const remove = i.keysToRemove;

      if (i[key] === 'addProperties') {
        for (const x in add) {
          workState[x] = add[x];
        }

        result.push({ ...workState });
      }

      if (i[key] === 'removeProperties') {
        for (const ch of remove) {
          if (ch in workState) {
            delete workState[ch];
          }
        }

        result.push({ ...workState });
      }

      if (i[key] === 'clear') {
        for (const del in workState) {
          delete workState[del];
        }

        result.push({ ...workState });
      }
    }
  }

  return result;
}

module.exports = transformStateWithClones;
