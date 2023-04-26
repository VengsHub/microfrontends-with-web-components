export const loadModule = async (file, name) => {
  await import('./default-web-component.js');
  const element = document.createElement(name);
  console.log('module', element);
  return element;
}
