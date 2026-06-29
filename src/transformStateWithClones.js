'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateChangeList = [];
  let tempState = clone(state);

  for (const action of actions) {
    tempState = actionsTypeStorage[action.type](tempState, action);
    stateChangeList.push(tempState);
  }

  // for (const a of actions) {
  //   switch (a.type) {
  //     case 'addProperties':
  //       temp = addProperties(a, temp);
  //       stats.push(temp);
  //       break;
  //     case 'removeProperties':
  //       temp = removeProperties(a, temp);
  //       stats.push(temp);
  //       break;
  //     case 'clear':
  //       temp = clear(a, temp);
  //       stats.push(temp);
  //       break;
  //     default:
  //       throw new Error(`Unknown action type: ${a.type}`);
  //   }
  //   // stats.push(event[a.key](temp, a));
  //   // temp = stats.at(-1);
  // }

  return stateChangeList;
}

module.exports = transformStateWithClones;

const actionsTypeStorage = {
  clear: () => clear(),
  addProperties: (state, { extraData }) => addProperties({ extraData }, state),
  removeProperties: (state, { keysToRemove }) =>
    removeProperties({ keysToRemove }, state),
};

function addProperties({ extraData }, state) {
  const st = clone(state);

  for (const [key, value] of Object.entries(extraData)) {
    st[key] = value;
  }

  return st;
}

function removeProperties({ keysToRemove }, state) {
  const st = clone(state);

  for (const key of keysToRemove) {
    delete st[key];
  }

  return st;
}

function clear() {
  return {};
}

function clone(st) {
  return { ...st };
}
