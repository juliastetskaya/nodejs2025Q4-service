import { Injectable } from '@nestjs/common';
import fs from 'node:fs';
import path from 'node:path';

export enum CustomLogLevel {
  ERROR = 0,
  WARN = 1,
  LOG = 2,
  DEBUG = 3,
  VERBOSE = 4,
}

@Injectable()
export class LoggingService {
  private logLevel: CustomLogLevel;
  private logDir: string;
  private currentLogFile: string;
  private maxFileSize: number;
  private logStream: fs.WriteStream;

  constructor() {
    const envLogLevel = process.env.LOG_LEVEL?.toUpperCase() || 'LOG';
    this.logLevel = this.parseLogLevel(envLogLevel);

    this.maxFileSize = parseInt(process.env.LOG_MAX_FILE_SIZE || '1024', 10);

    this.addErrorListeners();

    this.logDir = path.join(process.cwd(), 'logs');
    try {
      if (!fs.existsSync(this.logDir)) {
        fs.mkdirSync(this.logDir, { recursive: true });
      }
      this.rotateLogFile();
    } catch (error) {
      console.error('Failed to initialize logging directory:', error);
      this.rotateLogFile();
    }
  }

  private parseLogLevel(level: string): CustomLogLevel {
    switch (level) {
      case 'ERROR':
        return CustomLogLevel.ERROR;
      case 'WARN':
        return CustomLogLevel.WARN;
      case 'LOG':
        return CustomLogLevel.LOG;
      case 'DEBUG':
        return CustomLogLevel.DEBUG;
      case 'VERBOSE':
        return CustomLogLevel.VERBOSE;
      default:
        return CustomLogLevel.LOG;
    }
  }

  private rotateLogFile(): void {
    if (this.logStream) {
      this.logStream.end();
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    this.currentLogFile = path.join(this.logDir, `app-${timestamp}.log`);

    try {
      this.logStream = fs.createWriteStream(this.currentLogFile, {
        flags: 'a',
      });

      this.logStream.on('error', (error) => {
        console.error('Log stream error:', error);
      });
    } catch (error) {
      console.error('Failed to create log stream:', error);
    }
  }

  private checkFileSize(): void {
    try {
      const stats = fs.statSync(this.currentLogFile);
      const fileSizeInKB = stats.size / 1024;

      if (fileSizeInKB >= this.maxFileSize) {
        this.rotateLogFile();
      }
    } catch (error) {
      this.rotateLogFile();
    }
  }

  private formatMessage(
    level: string,
    message: string,
    context?: string,
    trace?: string,
  ): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` [${context}]` : '';
    const traceStr = trace ? `\n${trace}` : '';
    return `[${timestamp}] [${level}]${contextStr} ${message}${traceStr}`;
  }

  private writeLog(
    level: string,
    message: string,
    context?: string,
    trace?: string,
  ): void {
    const formattedMessage = this.formatMessage(level, message, context, trace);

    console.log(formattedMessage);

    try {
      if (this.logStream && !this.logStream.destroyed) {
        this.checkFileSize();
        this.logStream.write(formattedMessage + '\n');
      }
    } catch (error) {
      console.error('Failed to write to log file:', error);
    }
  }

  error(message: string, trace?: string, context?: string): void {
    if (this.logLevel >= CustomLogLevel.ERROR) {
      this.writeLog('ERROR', message, context, trace);
    }
  }

  warn(message: string, context?: string): void {
    if (this.logLevel >= CustomLogLevel.WARN) {
      this.writeLog('WARN', message, context);
    }
  }

  log(message: string, context?: string): void {
    if (this.logLevel >= CustomLogLevel.LOG) {
      this.writeLog('LOG', message, context);
    }
  }

  debug(message: string, context?: string): void {
    if (this.logLevel >= CustomLogLevel.DEBUG) {
      this.writeLog('DEBUG', message, context);
    }
  }

  verbose(message: string, context?: string): void {
    if (this.logLevel >= CustomLogLevel.VERBOSE) {
      this.writeLog('VERBOSE', message, context);
    }
  }

  logRequest(method: string, url: string, query: any, body: any): void {
    const message = `Incoming Request: ${method} ${url}`;
    const details = {
      query: query && Object.keys(query).length > 0 ? query : undefined,
      body: body && Object.keys(body).length > 0 ? body : undefined,
    };
    const detailsStr =
      details.query || details.body
        ? `\n${JSON.stringify(details, null, 2)}`
        : '';
    this.log(`${message}${detailsStr}`, 'HTTP');
  }

  logResponse(
    method: string,
    url: string,
    statusCode: number,
    responseTime?: number,
  ): void {
    const timeStr = responseTime ? ` - ${responseTime}ms` : '';
    this.log(
      `Response: ${method} ${url} - Status: ${statusCode}${timeStr}`,
      'HTTP',
    );
  }

  logError(error: Error, context?: string): void {
    this.error(`${error.message}`, error.stack, context || 'Exception');
  }

  onModuleDestroy() {
    if (this.logStream) {
      this.logStream.end();
    }
  }

  private addErrorListeners() {
    process.on('uncaughtException', (error: Error) => {
      this.error(
        `Uncaught Exception: ${error.message}`,
        error.stack,
        'UncaughtException',
      );
      process.exit(1);
    });

    process.on('unhandledRejection', (reason: any) => {
      const message = reason instanceof Error ? reason.message : String(reason);
      const stack = reason instanceof Error ? reason.stack : undefined;
      this.error(
        `Unhandled Rejection: ${message}`,
        stack,
        'UnhandledRejection',
      );
    });
  }
}
