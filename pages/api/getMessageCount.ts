import { NextApiRequest, NextApiResponse } from "next";
import clerk, { getAuth, clerkClient } from "@clerk/nextjs/server";

type GetVideoResponse = {
  result?: any;
  error?: {
    message: string;
  };
};

import AWS from "aws-sdk";
AWS.config.update({ region: "us-east-1" });
var sqs = new AWS.SQS({ region: "us-east-1" });

export default async function (req: NextApiRequest, res: NextApiResponse<GetVideoResponse>) {
  const { sessionId, userId } = getAuth(req);
  if (!sessionId) {
    return res.status(401).json({ error: { message: "Unauthorized" } });
  }

  try {
    const user = await clerkClient.users.getUser(userId);

    var sqs = new AWS.SQS({
      region: "us-east-1",
    });

    const result = await new Promise((resolve, reject) => {
      sqs.getQueueAttributes(
        {
          QueueUrl: process.env.SQS_URL,
          AttributeNames: ["ApproximateNumberOfMessages"],
          //   MessageGroupId: "default",
          //   MessageDeduplicationId: "default",
        },
        (err, data) => {
          if (err) {
            reject(err);
          }

          console.log(data.Attributes);
          resolve(data.Attributes);
        }
      );
    });

    res.status(200).json({
      result,
    });
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}
