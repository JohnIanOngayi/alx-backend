import { Queue } from "kue";
import { isArray } from "util";
/**
 * creates and enqueues push notification jobs
 * @param {Object[]} jobs - array of job objects
 * @param {Queue} queue - queue of push notification jobs
 */
export const createPushNotificationsJobs = (jobs, queue) => {
  if (!Array.isArray(jobs)) throw new Error("Jobs is not an array");
  else {
    jobs.forEach((job3) => {
      const push_notification_code_3 = queue
        .createJob("job3", job3)
        .save((error) => {
          if (error)
            console.log(
              `Notification job ${push_notification_code_3.id} failed: ${error}`,
            );
          else
            console.log(
              `Notification job created: ${push_notification_code_3.id}`,
            );
        })
        .on("complete", () =>
          console.log(
            `Notification job ${push_notification_code_3.id} completed`,
          ),
        )
        .on("failed", (errorMessage) =>
          console.log(
            `Notification job ${push_notification_code_3.id} failed: ${error}`,
          ),
        )
        .on("progress", (progress) =>
          console.log(
            `Notification job ${push_notification_code_3.id} ${progress}% complete`,
          ),
        );
    });
  }
};

export default createPushNotificationsJobs;
