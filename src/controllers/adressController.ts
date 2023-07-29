import { NextFunction, Request, Response } from 'express'

import Controller from '../decorators/controllerDecorator'
import AddressService from '../services/adressService'

@Controller('/address')
class AddressController {}

export default AddressController
