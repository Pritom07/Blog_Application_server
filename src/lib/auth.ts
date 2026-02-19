import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";
import { config } from "../config";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: config.APP_USER,
    pass: config.APP_PASS,
  },
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  trustedOrigins: [config.APP_URL!, config.PROD_APP_URL!],

  cookies: {
    sessionToken: {
      name: "better-auth.session_token",
      options: {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // none for prod, lax for localhost
        secure: process.env.NODE_ENV === "production", // true in prod, false in dev
        path: "/",
      },
    },
  },

  ///?????? phero
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 6 * 60, // 6 minutes
    },
  },

  //???????? programming hero
  // advanced: {
  //   cookiePrefix: "better-auth",
  //   useSecureCookies: process.env.NODE_ENV === "production",
  //   crossSubDomainCookies: {
  //     enabled: false,
  //   },
  //   disableCSRFCheck: true, // Allow requests without Origin header (Postman, mobile apps, etc.)
  // },

  advanced: {
    cookiePrefix: "better-auth",
    useSecureCookies: process.env.NODE_ENV === "production",
    disableCSRFCheck: true, // optional, useful for Postman or testing
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "USER",
        required: false,
      },
      phone: {
        type: "string",
        required: false,
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false,
      },
    },
  },

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      try {
        const verificationUrl = `${config.APP_URL}/verify-email?token=${token}`;
        const info = await transporter.sendMail({
          from: `"Blog App"<${config.APP_USER}>`,
          to: user.email,
          subject: "Please Verify Your Email !",
          html: `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #f4f6f8;
        font-family: Arial, Helvetica, sans-serif;
      }

      .container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      }

      .header {
        background-color: #2563eb;
        color: #ffffff;
        padding: 20px;
        text-align: center;
      }

      .header h1 {
        margin: 0;
        font-size: 24px;
      }

      .content {
        padding: 30px;
        color: #333333;
        line-height: 1.6;
      }

      .content h2 {
        margin-top: 0;
        font-size: 20px;
      }

      .button-wrapper {
        text-align: center;
        margin: 30px 0;
      }

      .verify-button {
        display: inline-block;
        background-color: #1e4ed8;
        color: white !important;
        padding: 14px 28px;
        text-decoration: none;
        font-size: 16px;
        border-radius: 6px;
        font-weight: bold;
      }

      .footer {
        background-color: #f9fafb;
        padding: 20px;
        font-size: 13px;
        color: #6b7280;
        text-align: center;
      }

      .footer a {
        color: #2563eb;
        text-decoration: none;
      }

      @media (max-width: 600px) {
        .content {
          padding: 20px;
        }
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="header">
        <h1>Verify Your Email</h1>
      </div>

      <div class="content">
        <h2>Hello ${user.name},</h2>

        <p>
          Thank you for registering with <strong>Blog App</strong>.
          Please confirm your email address by clicking the button below.
        </p>

        <div class="button-wrapper">
          <a href="${verificationUrl}" class="verify-button">
            Verify Email
          </a>
        </div>

        <p>
          If the button above doesn’t work, copy and paste the following link
          into your browser:
        </p>

        <p>
          <a href="${verificationUrl}">
            ${verificationUrl}
          </a>
        </p>

        <p>
          If you did not create an account, you can safely ignore this email.
        </p>

        <p>Best regards,<br />The Blog App Team</p>
      </div>

      <div class="footer">
        <p>
          © 2026 Blog App. All rights reserved.
        </p>
      </div>
    </div>
  </body>
</html>
`,
        });
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },

  socialProviders: {
    google: {
      clientId: config.GOOGLE_CLIENT_ID as string,
      clientSecret: config.GOOGLE_CLIENT_SECRET as string,
      accessType: "offline",
      prompt: "select_account consent",
    },
  },
});
