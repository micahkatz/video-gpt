import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";

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

  console.log({ userId });

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

  try {
    await new Promise((resolve, reject) => {
      sqs.sendMessage(params, function (err, data) {
        if (err) {
          console.log("Error", err);
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
