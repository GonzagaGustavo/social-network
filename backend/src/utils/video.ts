import { spawn } from "node:child_process";
import { path as ffmpegPath } from "@ffmpeg-installer/ffmpeg";
import * as tmp from "tmp";
import path from "node:path";
import { writeFileSync } from "node:fs";
import { bucket } from "../middlewares/firebase";

export default async function processVideo(file: Express.Multer.File): Promise<{
  v1080: string | null;
  v720: string | null;
  v480: string | null;
  v144: string | null;
}> {
  const tempFilePath = tmp.tmpNameSync({
    postfix: path.extname(file.originalname),
  });
  writeFileSync(tempFilePath, file.buffer);

  const resolution = await getResolution(tempFilePath);

  if (resolution >= 1080) {
    const v1080Promise = videoTo1080p(tempFilePath);
    const v720Promise = videoTo720p(tempFilePath);
    const v480Promise = videoTo480p(tempFilePath);
    const v144Promise = videoTo144p(tempFilePath);

    const [v1080, v720, v480, v144] = await Promise.all([
      v1080Promise,
      v720Promise,
      v480Promise,
      v144Promise,
    ]);

    return {
      v1080,
      v720,
      v480,
      v144,
    };
  } else if (resolution < 1080 && resolution >= 720) {
    const v720Promise = videoTo720p(tempFilePath);
    const v480Promise = videoTo480p(tempFilePath);
    const v144Promise = videoTo144p(tempFilePath);

    const [v720, v480, v144] = await Promise.all([
      v720Promise,
      v480Promise,
      v144Promise,
    ]);

    return {
      v1080: null,
      v720,
      v480,
      v144,
    };
  } else if (resolution < 720 && resolution >= 480) {
    const v480Promise = videoTo480p(tempFilePath);
    const v144Promise = videoTo144p(tempFilePath);

    const [v480, v144] = await Promise.all([v480Promise, v144Promise]);

    return {
      v1080: null,
      v720: null,
      v480,
      v144,
    };
  } else if (resolution < 480 && resolution >= 144) {
    const v144 = await videoTo144p(tempFilePath);

    return {
      v144: v144,
      v1080: null,
      v480: null,
      v720: null,
    };
  }
}

function getResolution(path: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const video = spawn(ffmpegPath, ["-i", `${path}`]);

    video.stderr.on("data", (data) => {
      const match = data.toString().match(/Stream.*Video:.*\s(\d+)x(\d+)/);

      if (match && match[2]) resolve(Number(match[2]));
    });

    video.stderr.on("error", (err) => reject(err));
  });
}

function videoTo144p(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileName = Date.now() + "-144.mp4";

    const file = bucket.file(fileName);

    const ffmpeg = spawn(ffmpegPath, [
      `-i`,
      `${path}`,
      "-vcodec",
      "libx265",
      "-preset",
      "ultrafast",
      "-c:a",
      "copy",
      "-vf",
      "scale=-2:144",
      "-f",
      "mp4",
      `pipe:1`,
    ]);

    ffmpeg.stdout
      .pipe(file.createWriteStream())
      .on("finish", async () => {
        await file.makePublic();
        resolve(
          `https://storage.googleapis.com/${process.env.BUCKET}/${fileName}`
        );
      })
      .on("error", (error) => {
        console.error(
          "Erro ao enviar o arquivo para o Firebase Storage:",
          error
        );
        reject(error);
      });
  });
}
function videoTo480p(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileName = Date.now() + "-480.mp4";

    const file = bucket.file(fileName);

    const ffmpeg = spawn(ffmpegPath, [
      `-i`,
      `${path}`,
      "-vcodec",
      "libx265",
      "-preset",
      "ultrafast",
      "-c:a",
      "copy",
      "-vf",
      "scale=-2:480",
      "-f",
      "mp4",
      `pipe:1`,
    ]);

    ffmpeg.stdout
      .pipe(file.createWriteStream())
      .on("finish", async () => {
        await file.makePublic();
        resolve(
          `https://storage.googleapis.com/${process.env.BUCKET}/${fileName}`
        );
      })
      .on("error", (error) => {
        console.error(
          "Erro ao enviar o arquivo para o Firebase Storage:",
          error
        );
        reject(error);
      });
  });
}
function videoTo720p(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileName = Date.now() + "-720.mp4";

    const file = bucket.file(fileName);

    const ffmpeg = spawn(ffmpegPath, [
      `-i`,
      `${path}`,
      "-vcodec",
      "libx265",
      "-preset",
      "ultrafast",
      "-c:a",
      "copy",
      "-vf",
      "scale=-2:720",
      "-f",
      "mp4",
      `pipe:1`,
    ]);

    ffmpeg.stdout
      .pipe(file.createWriteStream())
      .on("finish", async () => {
        await file.makePublic();
        resolve(
          `https://storage.googleapis.com/${process.env.BUCKET}/${fileName}`
        );
      })
      .on("error", (error) => {
        console.error(
          "Erro ao enviar o arquivo para o Firebase Storage:",
          error
        );
        reject(error);
      });
  });
}
function videoTo1080p(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileName = Date.now() + "-1080.mp4";

    const file = bucket.file(fileName);

    const ffmpeg = spawn(ffmpegPath, [
      `-i`,
      `${path}`,
      "-vcodec",
      "libx265",
      "-preset",
      "ultrafast",
      "-c:a",
      "copy",
      "-vf",
      "scale=-2:1080",
      "-f",
      "mp4",
      `pipe:1`,
    ]);

    ffmpeg.stdout
      .pipe(file.createWriteStream())
      .on("finish", async () => {
        await file.makePublic();
        resolve(
          `https://storage.googleapis.com/${process.env.BUCKET}/${fileName}`
        );
      })
      .on("error", (error) => {
        console.error(
          "Erro ao enviar o arquivo para o Firebase Storage:",
          error
        );
        reject(error);
      });
  });
}
