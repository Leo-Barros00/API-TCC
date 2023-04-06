import chalk from 'chalk'
import { getLogDatetime } from './date'

export enum LogType {
  SUCCESS = 'green',
  INFO = 'cyan',
  ERROR = 'red'
}

export default function log(logType: LogType, logTitle: string, message: string, ) {
  const logString = `[${chalk[logType](logTitle)}] ${chalk.gray(getLogDatetime())} ${message}`
  console.log(logString)
}