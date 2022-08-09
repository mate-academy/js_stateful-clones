'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const intermObj = Object.assign({}, state);

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(intermObj, actions[i].extraData);
        stateHistory.push(Object.assign({}, intermObj));
        break;
      case 'removeProperties':
        for (const el of actions[i].keysToRemove) {
          delete intermObj[el];
        }
        stateHistory.push(Object.assign({}, intermObj));
        break;
      case 'clear':
        for (const key in intermObj) {
          delete intermObj[key];
        }
        stateHistory.push(Object.assign({}, intermObj));
    }
  }

  // console.log('state: ', state);
  // console.log('actions: ', actions);
  // console.log('intermObj: ', intermObj);
  // console.log('res: ', res);
  return stateHistory;
}

module.exports = transformStateWithClones;

// transformStateWithClones({foo: 'bar', bar: 'foo'}, [
//   {type: 'addProperties', extraData: {name: 'Jim', hello: 'world'}},
//   {type: 'removeProperties', keysToRemove: ['bar', 'hello']},
//   {type: 'clear'},
//   {type: 'addProperties', extraData: {another: 'one'}}
// ]);
