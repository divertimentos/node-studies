import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

const createUser = async (req, res) => {
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: await hashPassword(req.body.password),
    },
  });

  const token = createJWT(user);
  res.json({ token });
};

const signIn = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  const isValid = await comparePasswords(req.body.passsword, user.password);

  if (!isValid) {
    res.status(401);
    res.json({ message: "Wrong password!" });
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};
