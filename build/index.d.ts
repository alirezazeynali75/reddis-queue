import { Job } from 'bull';
declare const Bull: any;
export declare abstract class Queue {
    config: {
        port: number;
        host: string;
        password?: string;
    };
    queue: typeof Bull;
    logger: Logger;
    protected constructor(port: number, host: string, queueName: string, logger?: Logger, password?: string);
    abstract handler<T = any>(jobData: T): Promise<any>;
    processor<T = any>(job: Job<T>, done: Function): Promise<void>;
    abstract onComplete<T = any>(job: Job<T>): Promise<any>;
    abstract onFailed<T = any>(job: Job<T>, err: Error): Promise<any>;
    addJob(data: any): Promise<void>;
}
export {};
