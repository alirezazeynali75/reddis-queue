import chalk from 'chalk'
export class LoggerDriver implements Logger {
  debug (msg: string): void {
    chalk.blue(msg)
  }

  error (msg: string): void {
    chalk.bold.redBright(msg)
  }

  info (msg: string): void {
    chalk.bold.greenBright(msg)
  }

  warn (msg: string): void {
    chalk.bold.yellowBright(msg)
  }
}
