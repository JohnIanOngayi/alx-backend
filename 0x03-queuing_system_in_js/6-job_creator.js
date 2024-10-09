import { createQueue } from "kue";

export const queue = createQueue();

export const jobData = {
  phoneNumber: "4153518780",
  message: "This is the code to verify your account",
};

export const push_notification_code = queue
  .createJob("job", jobData)
  .save((error) => {
    if (error) console.log(`Notification job failed`);
    else console.log(`Notification job created: ${push_notification_code.id}`);
  })
  .on("complete", () => {
    console.log("Notification job completed");
  });
