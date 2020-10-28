// eslint-disable-next-line no-unused-vars
import { Job } from 'bull'
import { LoggerDriver } from './logger'

const Bull = require('bull')
export abstract class Queue {
  public config: { port: number; host: string; password?: string };
  public queue: typeof Bull;
  public logger: Logger;

  protected constructor (
    port: number,
    host: string,
    queueName: string,
    logger?: Logger,
    password?: string
  ) {
    this.config = {
      port: port,
      host: host,
      password: password
    }
    this.logger = logger || new LoggerDriver()
    this.queue = new Bull(queueName, { redis: this.config })
    this.queue.process(this.processor)
    this.queue.on('completed', this.onComplete)
    this.queue.on('failed', this.onFailed)
  }

  abstract handler<T = any>(jobData: T): Promise<any>;

  public async processor<T = any> (job: Job<T>, done: Function) {
    this.logger.debug('[*] Process new job, JobId: ' + job.id)
    await this.handler(job.data)
  }

  abstract async onComplete<T = any>(job: Job<T>): Promise<any>;

  abstract async onFailed<T = any>(job: Job<T>, err: Error): Promise<any>;

  public async addJob (data: any): Promise<void> {
    try {
      await this.queue.add(data)
    } catch (e) {
      this.logger.error('[!] Adding job failed')
      throw new Error('JobAddingFailed')
    }
  }
}
