export const compose = (...functions) => functions.reduce((a, b) => (...args) => a(b(...args)));
export const delay = t => new Promise(resolve => setTimeout(resolve, t));