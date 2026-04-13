export type Student = {
  id: number;
  userId?: string;
  fullName: string;
  dateOfBirth: Date;
  enrollmentDate: Date;
  gender: number;
  classId: number;
  class?: string;
  parentId?: number;
  parent?: string;
};
