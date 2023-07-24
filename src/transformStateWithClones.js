'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const s = JSON.parse(JSON.stringify(state)); // Pełna kopia obiektu state
  const arr = [];
  const acc = [];

  acc.push(s);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        const stat = JSON.parse(JSON.stringify(acc[acc.length - 1]));

        if (action.extraData && typeof action.extraData === 'object') {
          Object.assign(stat, action.extraData);
        }
        arr.push(stat);
        acc.push(stat);
        break;
      case 'removeProperties':
        const stat1 = JSON.parse(JSON.stringify(acc[acc.length - 1]));

        if (action.keysToRemove && Array.isArray(action.keysToRemove)) {
          for (const key of action.keysToRemove) {
            delete stat1[key];
          }
          arr.push(stat1);
          acc.push(stat1);
        }
        break;
      case 'clear':
        const stat2 = {}; // Tworzymy nowy pusty obiekt

        arr.push(stat2);
        acc.push(stat2);
        break;
      default:
        // Ignoring unknown action types
        break;
    }
  }

  return arr;
}

module.exports = transformStateWithClones;
