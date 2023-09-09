import { NextApiRequest, NextApiResponse } from "next";
import { getAuth, clerkClient } from "@clerk/nextjs/server";

type GenerateResponse = {
  result?: string;
  error?: {
    message: string;
  };
};

import AWS from "aws-sdk";
AWS.config.update({ region: "us-east-1" });
var sqs = new AWS.SQS({ region: "us-east-1" });

export default async function (req: NextApiRequest, res: NextApiResponse<GenerateResponse>) {
  const query = req.body.q as string;
  const { sessionId, userId } = getAuth(req);

  if (!sessionId) {
    return res.status(401).json({ error: { message: "Unauthorized" } });
  }

  try {
    const user = await clerkClient.users.getUser(userId);
    const publicMetadata = user?.publicMetadata;
    console.log("Public Meta Data:", publicMetadata);

    if (publicMetadata && publicMetadata.numTimesUsed >= 5) {
      return res.status(403).json({ error: { message: "Exceeded usage limit" } });
    }

    var params: AWS.SQS.SendMessageRequest = {
      MessageAttributes: {
        uid: {
          DataType: "String",
          StringValue: userId,
        },
      },
      MessageBody: query,
      QueueUrl: process.env.SQS_URL,
      MessageGroupId: "default",
      MessageDeduplicationId: "default",
    };

    await new Promise((resolve, reject) => {
      sqs.sendMessage(params, function (err, data) {
        if (err) {
          console.error("Error", err);
          reject(err);
        } else {
          console.log("Success", data.MessageId);
          resolve(data.MessageId);
        }
      });
    });

    res.status(200).json({});
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