import { Router } from "express";
import prisma from "../../db";
import { hashSync } from "bcrypt";

interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  username: string;
  phone: string;
  bio: string;
  gender: "male" | "female" | "prefer not to say";
  birthday: Date;
  country: string;
  estate: string;
  city: string;
}

const UserRoutes = Router();

UserRoutes.post("/", async (req, res) => {
  const user: User = {
    name: req.body.name,
    email: req.body.email,
    bio: req.body.bio,
    username: req.body.username,
    birthday: new Date(req.body.birthday),
    city: req.body.city,
    estate: req.body.estate,
    country: req.body.country,
    gender: req.body.gender,
    password: hashSync(req.body.password, 12),
    phone: req.body.phone,
  };

  try {
    const saved = await prisma.user.create({ data: user });
    await prisma.$disconnect();

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ success: false, err: err });
  }
});

UserRoutes.get("/", async (req, res) => {
  const id = Number(req.query.id);
  const username = req.query.username as string;
  if (id || username) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: id ? id : undefined,
          username: username ? username : undefined,
        },
        select: {
          password: false,
          country: false,
          phone: false,
          city: false,
          estate: false,
          email: true,
          bio: true,
          birthday: true,
          gender: true,
          id: true,
          name: true,
          username: true,
        },
      });
      await prisma.$disconnect();

      if (!user) {
        res.status(404).send("user not found");
        res.end();
      } else {
        res.status(200).json(user);
        res.end();
      }
    } catch (err) {
      console.error(err);
      res.status(501).json(err);
    }
  } else {
    res.status(404).send("parameter id or username not found");
    res.end();
  }
});

UserRoutes.get("/verify/username/:username", async (req, res) => {
  const unique = await prisma.user.findUnique({
    where: {
      username: req.params.username,
    },
  });

  if (!unique) {
    res.json({ exists: false });
    res.end();
  } else {
    res.json({ exists: true });
    res.end();
  }
});

UserRoutes.get("/verify/email/:email", async (req, res) => {
  const unique = await prisma.user.findUnique({
    where: {
      email: req.params.email,
    },
  });

  if (!unique) {
    res.json({ exists: false });
    res.end();
  } else {
    res.json({ exists: true });
    res.end();
  }
});

export default UserRoutes;
