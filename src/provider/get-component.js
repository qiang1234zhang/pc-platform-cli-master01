function getComponent(component) {
  return resolve => {
    import(`@/views/${component}.vue`).then(module => {
      resolve(module);
    });
  };
}

export default getComponent;
