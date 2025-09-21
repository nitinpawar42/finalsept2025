
export interface User {
  uid: string;
  email: string;
  fullName: string;
  role: 'admin' | 'reseller';
  approvalStatus: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}
