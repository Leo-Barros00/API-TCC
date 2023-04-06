import MetadataKeys from './metadataKeys';

const Middleware = (name: string): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata(MetadataKeys.MIDDLEWARE_NAME, name, target);
  };
}

export default Middleware;