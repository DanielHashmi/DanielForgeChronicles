export const generateEmail = (name: string, type: string) => {
    return type === 'book_claim' ? `
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to DanielForgeChronicles!</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
            color: #333;
        }

        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            overflow: hidden;
            border-radius: 5px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border: 1px solid #ddd;
        }

        .email-header {
            background-color: #f9f9f9;
            padding: 30px;
            text-align: center;
            font-size: 22px;
            font-weight: 100;
        }

        .email-header span {
            font-size: 28px;
        }

        .email-body {
            padding: 20px 30px;
        }

        .email-body h2 {
            margin-bottom: 10px;
            font-size: 20px;
        }

        .email-body p {
            margin-bottom: 15px;
            line-height: 1.8;
        }

        .button {
            display: inline-block;
            color: black;
            padding: 6px 24px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: all ease .5s;
            text-decoration: none;
            border-radius: 50rem;
            font-size: 12px;
        }

        .button:hover {
            background-color: rgb(245, 245, 245);
        }

        .email-footer {
            text-align: center;
            padding: 20px;
            font-size: 14px;
            color: #777;
            background-color: #f9f9f9;
        }

        .emoji {
            font-size: 22px;
            margin-right: 5px;
        }

        @media (max-width: 600px) {
            .email-header {
                font-size: 18px;
            }

            .email-body h2 {
                font-size: 18px;
            }
        }
    </style>
</head>

<body>
    <div class="email-container">
        <!-- Header -->
        <div class="email-header">
            <strong>DanielForgeChronicles</strong> Team
        </div>

        <!-- Body -->
        <div class="email-body">
            <p>
                Hey! ${name}<br>
                Welcome to <strong>DanielForgeChronicles</strong>, a <em>learning resource</em> brought to you by
                <strong>DanielCodeForge</strong>.
                We’re excited to have you join our community! <span class="emoji">🌍</span>
            </p>
            <p>
                <strong>
                    Visit
                    <a href="https://danielforgechronicles.vercel.app/newsletter" style="color: #6b6b6b;">Newsletter</a>
                </strong>
                and subscribe to get instant updates of latest resource as they are available.

            </p>
            <p style="text-align: center;">
                <a href="https://danielforgechronicles.vercel.app" class="button">📖 Explore More</a>
            </p>
         
        </div>

        <!-- Footer -->
        <div class="email-footer">
            <strong style="font-size: x-large;color: #333;">DanielCodeForge</strong>
            <p>
                © 2024 <strong>DanielCodeForge</strong>. All rights reserved.<br>
                You received this email because you requested some resource or did some activity on
                <strong>DanielForgeChronicles</strong>.
            </p>
            <p>
                <a href="https://danielcodeforge.vercel.app" style="color: #6b6b6b;">Company</a> |
                <a href="https://docs.google.com/document/d/1CfhpKECKC9TiTpRSuqkovdhr2dHGnfQU2mC8ARP8PTY/edit?usp=drive_link"
                    style="color: #6b6b6b;">Privacy Policy</a>
            </p>
        </div>
    </div>
</body>

</html>` : `
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Goodbye from DanielForgeChronicles</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
            color: #333;
        }

        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            overflow: hidden;
            border-radius: 5px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border: 1px solid #ddd;
        }

        .email-header {
            background-color: #f9f9f9;
            padding: 30px;
            text-align: center;
            font-size: 22px;
            font-weight: 100;
        }

        .email-header span {
            font-size: 28px;
        }

        .email-body {
            padding: 20px 30px;
        }

        .email-body h2 {
            margin-bottom: 10px;
            font-size: 20px;
        }

        .email-body p {
            margin-bottom: 15px;
            line-height: 1.8;
        }

        .button {
            display: inline-block;
            color: black;
            padding: 6px 24px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: all ease .5s;
            text-decoration: none;
            border-radius: 50rem;
            font-size: 12px;
        }

        .button:hover {
            background-color: rgb(245, 245, 245);
        }

        .email-footer {
            text-align: center;
            padding: 20px;
            font-size: 14px;
            color: #777;
            background-color: #f9f9f9;
        }

        .emoji {
            font-size: 22px;
            margin-right: 5px;
        }

        @media (max-width: 600px) {
            .email-header {
                font-size: 18px;
            }

            .email-body h2 {
                font-size: 18px;
            }
        }
    </style>
</head>

<body>
    <div class="email-container">
        <!-- Header -->
        <div class="email-header">
            <strong>DanielForgeChronicles</strong> Team
        </div>

        <!-- Body -->
        <div class="email-body">
            <p>
                Hey! ${name}<br>
                We're sad to see you unsubscribing <strong>DanielForgeChronicles</strong> Newsletter. If you feel disappointed please let us know how we can improve. 😢
            </p>
            <p>
                If you change your mind, you can always subscribe Newsletter again!
            </p>
            <p style="text-align: center;">
                <a href="https://danielforgechronicles.vercel.app/newsletter" class="button">🔄 Subscribe Newsletter</a>
            </p>
         
        </div>

        <!-- Footer -->
        <div class="email-footer">
            <strong style="font-size: x-large;color: #333;">DanielCodeForge</strong>
            <p>
                © 2024 <strong>DanielCodeForge</strong>. All rights reserved.<br>
                You received this email because you requested some resource or did some activity on
                <strong>DanielForgeChronicles</strong>.
            </p>
            <p>
                <a href="https://danielcodeforge.vercel.app" style="color: #6b6b6b;">Company</a> |
                <a href="https://docs.google.com/document/d/1CfhpKECKC9TiTpRSuqkovdhr2dHGnfQU2mC8ARP8PTY/edit?usp=drive_link"
                    style="color: #6b6b6b;">Privacy Policy</a>
            </p>
        </div>
    </div>
</body>

</html>`;
}