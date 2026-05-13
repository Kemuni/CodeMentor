export const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export const API = {
  auth: {
    github: `${BASE_URL}/v1/auth/github`,
    githubCallback: (code: string) => `${BASE_URL}/v1/auth/github/callback?code=${encodeURIComponent(code)}`,
    me: `${BASE_URL}/v1/auth/me`,
  },
  challenges: {
    list: (offset = 0, limit = 100) => `${BASE_URL}/v1/challenges/?offset=${offset}&limit=${limit}`,
    get: (id: number) => `${BASE_URL}/v1/challenges/${id}`,
    create: `${BASE_URL}/v1/challenges/`,
    update: (id: number) => `${BASE_URL}/v1/challenges/${id}`,
    delete: (id: number) => `${BASE_URL}/v1/challenges/${id}`,
    image: (id: number) => `${BASE_URL}/v1/challenges/${id}/image`,
    deleteImage: (id: number) => `${BASE_URL}/v1/challenges/${id}/image`,
    tags: (id: number) => `${BASE_URL}/v1/challenges/${id}/tags`,
  },
  solutions: {
    create: (challengeId: number) => `${BASE_URL}/v1/challenges/${challengeId}/solutions`,
    list: (challengeId: number, offset = 0, limit = 50) =>
      `${BASE_URL}/v1/challenges/${challengeId}/solutions?offset=${offset}&limit=${limit}`,
    get: (solutionId: number) => `${BASE_URL}/v1/solutions/${solutionId}`,
    delete: (solutionId: number) => `${BASE_URL}/v1/solutions/${solutionId}`,
    mySolutions: (offset = 0, limit = 50) => `${BASE_URL}/v1/users/me/solutions?offset=${offset}&limit=${limit}`,
  },
  tags: {
    list: (offset = 0, limit = 100) => `${BASE_URL}/v1/tags/?offset=${offset}&limit=${limit}`,
    get: (id: number) => `${BASE_URL}/v1/tags/${id}`,
    search: (name: string, offset = 0, limit = 100) =>
      `${BASE_URL}/v1/tags/search/?tag_name=${encodeURIComponent(name)}&offset=${offset}&limit=${limit}`,
    create: `${BASE_URL}/v1/tags/create`,
    update: (id: number, newName: string) =>
      `${BASE_URL}/v1/tags/update/${id}?new_name=${encodeURIComponent(newName)}`,
    delete: (id: number) => `${BASE_URL}/v1/tags/delete/${id}`,
  },
  progress: {
    start: (challengeId: number) => `${BASE_URL}/v1/challenges/${challengeId}/start`,
    stop: (challengeId: number) => `${BASE_URL}/v1/challenges/${challengeId}/start`,
    myInProgress: `${BASE_URL}/v1/users/me/challenges/in-progress`,
  },
};
