import chalk from 'chalk'
import { getLogDatetime } from './date'

export enum LogType {
  SUCCESS = 'green',
  INFO = 'cyan',
  ERROR = 'red',
  NEUTRAL = 'gray',
}

function getStatusColorByRequistionStatus(statusCode: number): LogType {
  if (statusCode > 400) return LogType.ERROR

  if (statusCode >= 200 && statusCode < 300) return LogType.SUCCESS

  return LogType.NEUTRAL
}

export function getStatusColoredByRequistionResult(statusCode: number) {
  const statusColor = getStatusColorByRequistionStatus(statusCode)
  return chalk[statusColor](statusCode)
}

export default function log(logType: LogType, logTitle: string, message: string) {
  const logString = `[${chalk[logType](logTitle)}] ${chalk.gray(getLogDatetime())} ${message}`
  console.log(logString)
}
