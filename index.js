/* eslint-disable no-param-reassign,no-use-before-define */

const { usePromise } = require('use-promise');
const { useRef } = require('react');

const once = (fn, config = { attach: false, strict: false }) => {
  if (typeof fn !== 'function') {
    throw new Error(`expected a function but got: ${typeof fn}`);
  }

  f.called = false;

  if (config.attach === true) {
    fn.once = f;
  }

  function f (...args) {
    if (f.called) {
      if (config.strict === true) {
        const name = fn.displayName || fn.name || '<anonymous>';
        throw new Error(`Function \`${name}\` can only be called once`);
      }
      return f.cache;
    }
    f.called = true;
    f.cache = fn(...args);

    return f.cache;
  }

  return f;
};

const useCall = (fn, ...args) => {
  const result = useRef(null);
  const fnRef = useRef(null);

  if (fn !== fnRef.current) {
    if (typeof fn === 'function') {
      fnRef.current = fn;
      result.current = fn(...args);
    } else {
      throw new Error(`expected a function but got: ${typeof fn}`);
    }
  }

  return result.current;
};

const useAsyncCall = (fn, ...args) => usePromise(useCall(fn, ...args));

module.exports = {
  once,
  useCall,
  useAsyncCall,
};
