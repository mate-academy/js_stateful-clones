'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];
  const intermObj = Object.assign({}, state);

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      Object.assign(intermObj, actions[i].extraData);
      res.push(Object.assign({}, intermObj));
    } else if (actions[i].type === 'removeProperties') {
      for (const el of actions[i].keysToRemove) {
        delete intermObj[el];
      }
      res.push(Object.assign({}, intermObj));
    } else if (actions[i].type === 'clear') {
      for (const key in intermObj) {
        delete intermObj[key];
      }
      res.push(Object.assign({}, intermObj));
    }
  }

  // console.log('state: ', state);
  // console.log('actions: ', actions);
  // console.log('intermObj: ', intermObj);
  // console.log('res: ', res);
  return res;
}

module.exports = transformStateWithClones;

// transformStateWithClones({foo: 'bar', bar: 'foo'}, [
//   {type: 'addProperties', extraData: {name: 'Jim', hello: 'world'}},
//   {type: 'removeProperties', keysToRemove: ['bar', 'hello']},
//   {type: 'clear'},
//   {type: 'addProperties', extraData: {another: 'one'}}
// ]);
