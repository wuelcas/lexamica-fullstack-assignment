const transformAgregateToJSON = (objectToTransform: any) => {
  const id = objectToTransform._id;
  delete objectToTransform._id;
  delete objectToTransform.__v;
  return {
    id,
    ...objectToTransform,
  };
};

export default transformAgregateToJSON;
