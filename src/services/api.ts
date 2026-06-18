import axios from "axios";

// ── Response Types ────────────────────────────────────────────────────────────

export interface AuthResponse {
  token: string;
  role: string;
}

export interface HealthEntry {
  _id?: string;
  date: string;
  mood: "Happy" | "Calm" | "Low Energy" | "Irritated" | "";
  water: number;
  sleep: number;
  symptoms: string;
  period: boolean;
  aiInsight?: string;
}

export interface Task {
  _id: string;
  title: string;
  status: "completed" | "pending" | string;
  dueDate?: string;
  updatedAt?: string;
}

export interface Transaction {
  _id: string;
  type: "income" | "expense";
  amount: number;
  date: string;
}

export interface UserProfile {
  name: string;
  email: string;
  role: "member" | "admin";
  avatar?: string;
}

export interface AIInsightResponse {
  insight?: string;
  aiInsight?: string;
}

// ── Axios Instance ────────────────────────────────────────────────────────────

const API = axios.create({
  baseURL: "https://hersync-backend.onrender.com/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// ── Typed API Helpers ─────────────────────────────────────────────────────────

export const authAPI = {
  login: (email: string, password: string) =>
    API.post<AuthResponse>("/auth/login", { email, password }),
  register: (name: string, email: string, password: string) =>
    API.post<AuthResponse>("/auth/register", { name, email, password }),
};

export const healthAPI = {
  getEntries: () => API.get<HealthEntry[]>("/health"),
  saveEntry: (entry: Omit<HealthEntry, "_id">) =>
    API.post<HealthEntry>("/health", entry),
  getInsight: (entries: HealthEntry[]) =>
    API.post<AIInsightResponse>("/ai/health-insight", { entries }),
};

export const tasksAPI = {
  getAll: () => API.get<Task[]>("/tasks"),
  create: (task: Pick<Task, "title" | "dueDate">) =>
    API.post<Task>("/tasks", task),
  update: (id: string, updates: Partial<Task>) =>
    API.put<Task>(`/tasks/${id}`, updates),
  remove: (id: string) => API.delete(`/tasks/${id}`),
};

export const financeAPI = {
  getAll: () => API.get<Transaction[]>("/transactions"),
  create: (tx: Omit<Transaction, "_id">) =>
    API.post<Transaction>("/transactions", tx),
  remove: (id: string) => API.delete(`/transactions/${id}`),
};

export const profileAPI = {
  get: () => API.get<UserProfile>("/profile"),
  update: (data: Partial<UserProfile>) =>
    API.post<UserProfile>("/profile", data),
};

export default API;
