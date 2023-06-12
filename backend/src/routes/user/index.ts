import { Router } from "express";
import prisma from "../../db";
import { hashSync, compareSync } from "bcrypt";
import AuthGuard, {
  UserPlayload,
  generateToken,
  generateTokenFromRefreshToken,
} from "../../utils/jwt";

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

    res.json({
      success: true,
    });
    res.end();
  } catch (err) {
    console.error(err);
    res.status(201).json({ success: false, err: err });
    res.end();
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
          email: false,
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

UserRoutes.get("/protected", AuthGuard, (req, res) => {
  res.json("Parabéns");
});

UserRoutes.post("/login", async (req, res) => {
  const login = {
    email: req.body.email,
    password: req.body.password,
  };

  const user = await prisma.user.findUnique({
    where: {
      email: login.email,
    },
  });

  if (!user) {
    res
      .status(201)
      .json({ err: { email: "Não existe uma conta com este email." } });
    return res.end();
  }

  if (compareSync(login.password, user.password)) {
    const playload: UserPlayload = {
      id: user.id,
      email: user.email,
    };

    const { refreshToken, token } = await generateToken(playload);

    res.json({
      success: true,
      token,
      refreshToken,
      user: { name: user.name, username: user.username, email: user.email },
    });
    res.end();
  } else {
    res.status(201).json({ err: { password: "Senha incorreta!" } });
  }
});

UserRoutes.post("/refresh-token", async (req, res) => {
  const { refresh_token } = req.body;

  const newToken = await generateTokenFromRefreshToken(refresh_token);

  if (!newToken) {
    res.status(401).json({ message: "Invalid refresh token" });
    return res.end();
  }

  const { refreshToken, token } = newToken;

  res.json({ success: true, token, refreshToken });
  res.end();
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
