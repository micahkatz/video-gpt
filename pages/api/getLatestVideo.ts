import { NextApiRequest, NextApiResponse } from "next";
import clerk, { getAuth, clerkClient } from "@clerk/nextjs/server";

type GetVideoResponse = {
  url?: string;
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

    var s3 = new AWS.S3({
      region: "us-east-1",
    });

    console.log({ publicMetadata: user.publicMetadata });

    const key = user.publicMetadata?.lastVideo;
    var options = {
      Bucket: "video-gpt-results",
      Key: key /* Filename in the bucket */,
    };

    const url = await s3.getSignedUrlPromise("getObject", options);

    console.log({ url });

    res.status(200).json({
      url,
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
