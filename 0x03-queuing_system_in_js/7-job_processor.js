import { createQueue, Job } from "kue";

const processorQueue = createQueue();

/** @type {String[]} - blacklisted phone no.s */
const blackListed = ["4153518780", "4153518781"];

/**
 * sends notification, conpleting queued notification jobs
 * @param {String} phoneNumber - the phoneNumber
 * @param {String} message - the message
 * @param {Job} job - the queued job
 * @param {Function} done - callback to successfully quit job processing
 */
const sendNotification = (phoneNumber, message, job, done) => {
  job.progress(0, 100, job.data);
  if (blackListed.includes(phoneNumber)) {
    return done(new Error(`Phone number ${phoneNumber} is blacklisted`));
  }
  job.progress(50, 100, job.data);
  console.log(
    `Sending notification to ${phoneNumber}, with message: ${message}`,
  );
  done();
};

processorQueue.process("job2", (job2, done) => {
  sendNotification(job2.data.phoneNumber, job2.data.message, job2, done);
});
