// credit to https://github.com/kitze/conditional-wrap

const ConditionalWrap = ({ condition, wrap, children }) =>
  condition ? wrap(children) : children;

export default ConditionalWrap;