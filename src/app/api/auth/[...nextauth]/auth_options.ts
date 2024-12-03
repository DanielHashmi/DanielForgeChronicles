import clientPromise from "@/mongodb/connect";
import { USER_GOOGLE_DATA } from "@/types/interfaces";
import GoogleProvider from "next-auth/providers/google";

export const auth_options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,  // Google Client ID
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,  // Google Client Secret
    }),
  ],

  callbacks: {
    async signIn({ user }: { user: USER_GOOGLE_DATA }) {
      try {
        const client = await clientPromise;
        const db = client.db("danielforgechroniclesDB");

        // Check if user already exists in the database by email
        const existingUser = await db.collection("user_data_by_google").findOne({ email: user.email });

        if (!existingUser) {
          // Insert new user if they don't exist
          await db.collection("user_data_by_google").insertOne({
            name: user.name,
            email: user.email,
            image: user.image,
            subscribed: false,
            createdAt: new Date(),
          }) as USER_GOOGLE_DATA;

          console.log("User inserted:", user.email);
        } else {
          console.log("User already exists:", user.email);
        }
      } catch (error) {
        console.log("Error saving user to MongoDB:", error);
      };
      return true; // Allow sign-in
    },

  },
};
