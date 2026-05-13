import { API } from "@/constants/api";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Tag {
  id: number | null;
  name: string;
}

export interface ReadChallenge {
  id: number | null;
  name: string;
  is_free: boolean;
  type: "Frontend" | "Backend" | "Fullstack";
  difficulty: number;
  description: string;
  task_description: string;
  image_url: string;
  tags: Tag[];
}

export interface ReadUser {
  id: number;
  github_id: number;
  username: string;
  email: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface ReadChallengeSolution {
  id: number;
  challenge_id: number;
  user_id: number;
  general_description: string;
  trouble_description: string;
  repo_url: string | null;
  total_rate: number;
  total_difficulty: number;
  created_at: string;
  user: ReadUser;
  challenge_name?: string | null;
}

export interface ReadUserChallengeProgress {
  id: number;
  user_id: number;
  challenge_id: number;
  started_at: string;
  challenge: ReadChallenge;
}

export interface APIResponse<T> {
  success: boolean;
  data: T | null;
  error: { code: string; message: string } | null;
}

// ─── Core fetch ──────────────────────────────────────────────────────────────

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
}

async function apiFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<APIResponse<T>> {
  const token = getToken();
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  try {
    const res = await fetch(url, { ...options, headers });
    const json = await res.json();
    return json as APIResponse<T>;
  } catch (err) {
    return {
      success: false,
      data: null,
      error: {
        code: "NETWORK_ERROR",
        message: err instanceof Error ? err.message : "Ошибка сети. Проверьте, запущен ли сервер.",
      },
    };
  }
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export const authApi = {
  async getGithubLoginUrl(): Promise<string> {
    const res = await fetch(API.auth.github);
    const json = await res.json();
    return json.url as string;
  },

  async githubCallback(code: string): Promise<string> {
    const res = await fetch(API.auth.githubCallback(code));
    const json = await res.json();
    if (!json.access_token) throw new Error("No access_token in response");
    return json.access_token as string;
  },

  async me(): Promise<APIResponse<ReadUser>> {
    return apiFetch<ReadUser>(API.auth.me);
  },
};

// ─── Challenges ──────────────────────────────────────────────────────────────

export interface ChallengeBody {
  name: string;
  is_free: boolean;
  type: "Frontend" | "Backend" | "Fullstack";
  difficulty: number;
  description: string;
  task_description: string;
  image_url: string;
  tags: string[];
}

export const challengesApi = {
  async list(offset = 0, limit = 100): Promise<APIResponse<ReadChallenge[]>> {
    return apiFetch<ReadChallenge[]>(API.challenges.list(offset, limit));
  },

  async get(id: number): Promise<APIResponse<ReadChallenge>> {
    return apiFetch<ReadChallenge>(API.challenges.get(id));
  },

  async create(body: ChallengeBody): Promise<APIResponse<ReadChallenge>> {
    return apiFetch<ReadChallenge>(API.challenges.create, {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  async uploadImage(id: number, file: File): Promise<APIResponse<ReadChallenge>> {
    const form = new FormData();
    form.append("file", file);
    return apiFetch<ReadChallenge>(API.challenges.image(id), {
      method: "POST",
      body: form,
    });
  },

  async deleteImage(id: number): Promise<APIResponse<ReadChallenge>> {
    return apiFetch<ReadChallenge>(API.challenges.image(id), {
      method: "DELETE",
    });
  },
};

// ─── Solutions ───────────────────────────────────────────────────────────────

export interface ChallengeSolutionBody {
  general_description: string;
  trouble_description: string;
  repo_url?: string | null;
  total_rate: number;
  total_difficulty: number;
}

export const solutionsApi = {
  async create(
    challengeId: number,
    body: ChallengeSolutionBody
  ): Promise<APIResponse<ReadChallengeSolution>> {
    return apiFetch<ReadChallengeSolution>(API.solutions.create(challengeId), {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  async list(challengeId: number, offset = 0, limit = 50): Promise<APIResponse<ReadChallengeSolution[]>> {
    return apiFetch<ReadChallengeSolution[]>(API.solutions.list(challengeId, offset, limit));
  },

  async get(solutionId: number): Promise<APIResponse<ReadChallengeSolution>> {
    return apiFetch<ReadChallengeSolution>(API.solutions.get(solutionId));
  },

  async delete(solutionId: number): Promise<APIResponse<null>> {
    return apiFetch<null>(API.solutions.delete(solutionId), { method: "DELETE" });
  },

  async mySolutions(offset = 0, limit = 50): Promise<APIResponse<ReadChallengeSolution[]>> {
    return apiFetch<ReadChallengeSolution[]>(API.solutions.mySolutions(offset, limit));
  },
};

// ─── Progress ─────────────────────────────────────────────────────────────────

export const progressApi = {
  async startChallenge(challengeId: number): Promise<APIResponse<ReadUserChallengeProgress>> {
    return apiFetch<ReadUserChallengeProgress>(API.progress.start(challengeId), {
      method: "POST",
    });
  },

  async stopChallenge(challengeId: number): Promise<APIResponse<null>> {
    return apiFetch<null>(API.progress.stop(challengeId), { method: "DELETE" });
  },

  async getMyInProgress(): Promise<APIResponse<ReadUserChallengeProgress[]>> {
    return apiFetch<ReadUserChallengeProgress[]>(API.progress.myInProgress);
  },
};

// ─── Tags ─────────────────────────────────────────────────────────────────────

export const tagsApi = {
  async list(offset = 0, limit = 100): Promise<APIResponse<Tag[]>> {
    return apiFetch<Tag[]>(API.tags.list(offset, limit));
  },

  async search(name: string): Promise<APIResponse<Tag[]>> {
    return apiFetch<Tag[]>(API.tags.search(name));
  },

  async create(name: string): Promise<APIResponse<Tag>> {
    return apiFetch<Tag>(API.tags.create, {
      method: "POST",
      body: JSON.stringify({ name }),
    });
  },
};
