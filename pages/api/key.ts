import { NextApiRequest, NextApiResponse } from "next";
import { getAuth, clerkClient } from "@clerk/nextjs/server";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);
  switch (req.method) {
    case "GET":
      try {
        const user = await clerkClient.users.getUser(userId);
        return res.status(200).json(user?.privateMetadata || {});
      } catch (err) {
        return res.status(500).send({});
      }
    case "POST":
      const openAIApiKey = req?.body?.openAIApiKey;
      const elevenLabsApiKey = req?.body?.elevenLabsApiKey;
      const googleSearchApiKey = req?.body?.googleSearchApiKey;
      const cseId = req?.body?.cseId;

      console.log({ body: req.body });

      try {
        const privateMetadata = {
          OPENAI_API_KEY: openAIApiKey,
          CSE_ID: cseId,
          ELEVEN_LABS_API_KEY: elevenLabsApiKey,
          GOOGLE_SEARCH_API_KEY: googleSearchApiKey,
        };

        console.log({ privateMetadata });
        const updatedUser = await clerkClient.users.updateUser(userId, {
          privateMetadata,
        });

        console.log("API Keys and CSE ID saved for user:", updatedUser);

        return res.status(200).json({ message: "API keys saved successfully" });
      } catch (error) {
        console.error("Error saving API keys:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
      break;
    default:
      res.status(405).json({ error: "Method not allowed" });
  }
}
