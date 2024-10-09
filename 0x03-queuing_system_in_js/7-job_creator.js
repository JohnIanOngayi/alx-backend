import { createQueue } from "kue";
/**@type {Array} - Array of job data objects*/
const jobs = [
  {
    phoneNumber: "4153518780",
    message: "This is the code 1234 to verify your account",
  },
  {
    phoneNumber: "4153518781",
    message: "This is the code 4562 to verify your account",
  },
  {
    phoneNumber: "4153518743",
    message: "This is the code 4321 to verify your account",
  },
  {
    phoneNumber: "4153538781",
    message: "This is the code 4562 to verify your account",
  },
  {
    phoneNumber: "4153118782",
    message: "This is the code 4321 to verify your account",
  },
  {
    phoneNumber: "4153718781",
    message: "This is the code 4562 to verify your account",
  },
  {
    phoneNumber: "4159518782",
    message: "This is the code 4321 to verify your account",
  },
  {
    phoneNumber: "4158718781",
    message: "This is the code 4562 to verify your account",
  },
  {
    phoneNumber: "4153818782",
    message: "This is the code 4321 to verify your account",
  },
  {
    phoneNumber: "4154318781",
    message: "This is the code 4562 to verify your account",
  },
  {
    phoneNumber: "4151218782",
    message: "This is the code 4321 to verify your account",
  },
];

const queue2 = createQueue();
jobs.forEach((job2Data) => {
  const push_notification_code_2 = queue2
    .createJob("job2", job2Data)
    .save((error) => {
      if (error)
        console.log(
          `Notification job #${push_notification_code_2.id} failed: ${error}`,
        );
      else
        console.log(`Notification job created: ${push_notification_code_2.id}`);
    })
    .on("failed", (errorMessage) => {
      console.log(
        `Notification job #${push_notification_code_2.id} failed: ${errorMessage}`,
      );
    })
    .on("progress", (progress) => {
      console.log(
        `Notification job #${push_notification_code_2.id} ${progress}% complete`,
      );
    })
    .on("complete", () => {
      console.log(`Notification job #${push_notification_code_2.id} completed`);
    });
});
