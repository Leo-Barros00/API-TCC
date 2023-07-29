import { Handler, Router } from 'express'

import controllers from './controllers'
import MetadataKeys from './decorators/metadataKeys'
import { AuthContext, IRoute } from './decorators/handlerDecorator'
import AuthMiddleware from './middlewares/authMiddleware'

type ClassConstructor<T = any> = new (...args: any[]) => T
type ControllerInstance = {
  [handleName: string]: Handler
}

const authHandlers = {
  [AuthContext.NormalUser]: AuthMiddleware.normalUserHandler,
  [AuthContext.Admin]: AuthMiddleware.adminHandler,
  [AuthContext.Unprotected]: null,
}

function getMethodsRouterByControllerRouters(controllerClass: ClassConstructor) {
  const controllerInstance: ControllerInstance = new controllerClass()
  const routers = Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass) as IRoute[]

  const methodsRouter = Router()

  if (routers)
    routers.forEach(({ method, path, handlerName, authContext }) => {
      const routerMainHandle = controllerInstance[String(handlerName)].bind(controllerInstance)

      const routeAuthHandle = authHandlers[authContext]

      if (routeAuthHandle) methodsRouter[method](path, routeAuthHandle, routerMainHandle)
      else methodsRouter[method](path, routerMainHandle)
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
