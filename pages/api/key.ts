import { NextApiRequest, NextApiResponse } from "next";
import clerk, { getAuth, clerkClient } from "@clerk/nextjs/server";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { sessionId, userId } = getAuth(req);
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    openAIApiKey,
    elevenLabsApiKey,
    googleSearchApiKey,
    cseId,
  } = req.body;

  try {

    const userId = "my-user-id";

    const privateMetadata = {
      openAIApiKey,
      elevenLabsApiKey,
      googleSearchApiKey,
      cseId,
    };

    const updatedUser = await clerkClient.users.updateUser(userId, {
      privateMetadata,
    });

    console.log("API Keys and CSE ID saved for user:", updatedUser);

    return res.status(200).json({ message: "API keys saved successfully" });
  } catch (error) {
    console.error("Error saving API keys:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
