type Author = {
  bio: string;
  gender: string;
  id: number;
  name: string;
  username: string;
};

type Video = {
  id: number;
  thumb: string;
  v1080p: string | null;
  v720p: string | null;
  v480p: string | null;
  v144p: string | null;
};

export interface Post {
  id: number;
  autor: Author;
  video: Video | null;
  created: string;
  type: string;
  title: string;
  description: string;
  file: string | null;
}
