import chalk from 'chalk';
import fs from 'fs';

enum LogLevel {
  Error = 1,
  Warn,
  Info,
  Debug
}

interface LogOptions {
  toConsole: boolean;
  toFile: boolean;
  filePath?: string;
}

class Logger {
  private static instance: Logger;
  private logLevel: LogLevel;
  private options: LogOptions;

  private constructor(logLevel: LogLevel, options: LogOptions) {
    this.logLevel = logLevel;
    this.options = options;
  }

  public setOptions(logLevel: LogLevel, options: LogOptions): void {
    this.logLevel = logLevel;
    this.options = options;
  }

  public static createInstance(): Logger {
    const defaultLogLevel = LogLevel.Debug;
    const defaultOptions: LogOptions = {
      toConsole: true,
      toFile: false
    };
    return new Logger(defaultLogLevel, defaultOptions);
  }

  private formatMessage(
    color: string,
    level: LogLevel,
    className: string,
    functionName: string,
    message: string
  ): string {
    const timestamp = new Date().toISOString();
    const levelStr = LogLevel[level];
    const formattedMessage = chalk.keyword(color)(
      `[${timestamp}] [${levelStr}] ${className}.${functionName} : ${message}`
    );
    return formattedMessage;
  }

  //  chalk.keyword('orange')
  private log(
    color: string,
    level: LogLevel,
    className: string,
    functionName: string,
    message: string
  ): void {
    if (level <= this.logLevel) {
      const formattedMessage = this.formatMessage(
        color,
        level,
        className,
        functionName,
        message
      );
      if (this.options.toConsole) {
        console.log(formattedMessage);
      }
      if (this.options.toFile && this.options.filePath) {
        fs.appendFileSync(this.options.filePath, formattedMessage + '\n');
      }
    }
  }

  error(className: string, functionName: string, message: string): void {
    this.log('red', LogLevel.Error, className, functionName, message);
  }

  warn(className: string, functionName: string, message: string): void {
    this.log('orange', LogLevel.Warn, className, functionName, message);
  }

  info(className: string, functionName: string, message: string): void {
    this.log('blue', LogLevel.Info, className, functionName, message);
  }

  debug(className: string, functionName: string, message: string): void {
    this.log('green', LogLevel.Debug, className, functionName, message);
  }
}

const loggerInstance = Logger.createInstance();
export { loggerInstance as logger, LogLevel, LogOptions };
