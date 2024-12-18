import nodemailer from "nodemailer";
import { google } from "googleapis";
import { NextResponse } from "next/server";
import { MAIL_OPTIONS } from "@/types/interfaces";

export async function POST(req: Request) {
    const { to, subject, html, attachment, from } = await req.json();

    // Fetch and process the attachment if it has a path
    if (attachment?.path) {
        try {
            const file_in_google = await fetch(attachment.path, {
                headers: { 'User-Agent': 'Mozilla/5.0' },
            });

            if (!file_in_google.ok) throw new Error(`Failed to fetch file: ${file_in_google.statusText}`);

            // Convert ArrayBuffer to Buffer
            const fileBuffer = Buffer.from(await file_in_google.arrayBuffer());

            // Update attachment to use the Buffer
            attachment.content = fileBuffer;
            delete attachment.path;  // Remove the path property
        } catch (error) {
            console.error("Error fetching or processing file:", error);
            return NextResponse.json({ message: "Failed to fetch or process attachment", error }, { status: 500 });
        }
    }

    const oAuth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.REDIRECT_URI,
    );
    oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

    try {
        // Generate an access token
        const accessToken = await oAuth2Client.getAccessToken();

        // Create the transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.COMPANY_EMAIL,
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken.token || "",
            },
        });

        // Define mail options
        const mailOptions = {
            from: from ? `${from} via DanielForgeChronicles <${process.env.COMPANY_EMAIL}>` : `DanielForgeChronicles (By DanielCodeForge) -- <${process.env.COMPANY_EMAIL}>`,
            to,
            subject,
            html,
            ...(attachment && {
                attachments: [
                    {
                        filename: attachment.filename,
                        content: attachment.content,
                    },
                ],
            }),
        };

        // Send the email
        const result = await transporter.sendMail(mailOptions as MAIL_OPTIONS);
        return NextResponse.json({ message: "Email sent", result }, { status: 200 });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({ message: "Failed to send email", error }, { status: 500 });
    }
}
