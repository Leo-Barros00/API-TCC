import { Handler, Router } from 'express'

import controllers from './controllers'
import MetadataKeys from './decorators/metadataKeys'
import { IRoute } from './decorators/handlerDecorator'

type ClassConstructor<T = any> = new (...args: any[]) => T
type ControllerInstance = {
  [handleName: string]: Handler
}

function getMethodsRouterByControllerRouters(controllerClass: ClassConstructor) {
  const controllerInstance: ControllerInstance = new controllerClass()
  const routers = Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass) as IRoute[]

  const methodsRouter = Router()

  routers.forEach(({ method, path, handlerName }) => {
    methodsRouter[method](path, controllerInstance[String(handlerName)].bind(controllerInstance))
  })

  return methodsRouter
}

function getRoutes() {
  const routes = controllers.map((controllerClass) => {
    const basePath = Reflect.getMetadata(MetadataKeys.BASE_PATH, controllerClass) as string

    const controllerGeralRouter = Router()
    const methodsRouter = getMethodsRouterByControllerRouters(controllerClass)

    controllerGeralRouter.use(basePath, methodsRouter)
    return controllerGeralRouter
  })

  return routes
}

export default getRoutes
