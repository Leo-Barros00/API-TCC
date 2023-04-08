import MetadataKeys from './metadataKeys'

export enum Methods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete'
}

export interface IRoute {
  method: Methods
  path: string
  handlerName: string | symbol
}

const methodDecoratorFactory = (method: Methods) => {
  return (path: string): MethodDecorator => {
    return ({ constructor: controllerClass }, propertyKey) => {
      const controllerRouters: IRoute[] =  Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass) ?? []

      const currentRouter = {
        method,
        path,
        handlerName: propertyKey
      }

      const newControllerRouters = [...controllerRouters, currentRouter]

      Reflect.defineMetadata(MetadataKeys.ROUTERS, newControllerRouters, controllerClass)
    }
  }
}

export const Get = methodDecoratorFactory(Methods.GET)
export const Post = methodDecoratorFactory(Methods.POST)
export const Put = methodDecoratorFactory(Methods.PUT)
export const Delete = methodDecoratorFactory(Methods.DELETE)