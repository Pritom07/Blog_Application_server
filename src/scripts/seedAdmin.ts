import { config } from "../config/index";
import { prisma } from "../lib/prisma";

const seedAdmin = async () => {
  const adminInfo = {
    name: config.SEED_ADMIN_NAME,
    email: config.SEED_ADMIN_EMAIL,
    password: config.SEED_ADMIN_PASS,
    role: config.SEED_ADMIN_ROLE,
  };

  if (!adminInfo.email) {
    throw new Error("SEED_ADMIN_EMAIL is not defined");
  }

  const isExist = await prisma.user.findUnique({
    where: {
      email: adminInfo.email,
    },
  });

  if (isExist) {
    throw new Error("User already exists");
  }

  try {
    const signUpAdmin = await fetch(
      `http://localhost:3000/api/auth/sign-up/email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: config.APP_URL as string,
        },
        body: JSON.stringify(adminInfo),
      }
    );

    if (signUpAdmin.ok) {
      await prisma.user.update({
        where: {
          email: adminInfo.email,
        },
        data: {
          emailVerified: true,
        },
      });
    }
  } catch (err) {
    throw err;
  }
};

seedAdmin();
