"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
const logger_1 = require("./logger");
const Bull = require('bull');
class Queue {
    constructor(port, host, queueName, logger, password) {
        this.config = {
            port: port,
            host: host,
            password: password
        };
        this.logger = logger || new logger_1.LoggerDriver();
        this.queue = new Bull(queueName, { redis: this.config });
        this.queue.process(this.processor);
        this.queue.on('completed', this.onComplete);
        this.queue.on('failed', this.onFailed);
    }
    async processor(job, done) {
        this.logger.debug('[*] Process new job, JobId: ' + job.id);
        await this.handler(job.data);
    }
    async addJob(data) {
        try {
            await this.queue.add(data);
        }
        catch (e) {
            this.logger.error('[!] Adding job failed');
            throw new Error('JobAddingFailed');
        }
    }
}
exports.Queue = Queue;
