export type User = {
  id: string;
  name: string;
  mobile: string;
  email: string | null;
  avatarUrl: string | null;
  address: string | null;
  state: string | null;
  district: string | null;
  municipality: string | null;
  createdAt: string;
};

export type Complaint = {
  id: string;
  problem: string;
  location: string;
  authority: string;
  status: string;
  date: string;
  raw: any;
};

const globalAny = global as any;

if (!globalAny.mockUsers) {
  globalAny.mockUsers = new Map<string, User>();
}
if (!globalAny.mockComplaints) {
  globalAny.mockComplaints = [];
}

export const db = {
  users: globalAny.mockUsers as Map<string, User>,
  complaints: globalAny.mockComplaints as Complaint[]
};
