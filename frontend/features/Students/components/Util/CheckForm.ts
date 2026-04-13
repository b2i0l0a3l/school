import { Student } from "../../types/studentType";

export function CheckForm(student: Student) {
  if (
    student.fullName === "" ||
    student.dateOfBirth == null ||
    student.gender < 0 ||
    student.gender > 1 ||
    student.enrollmentDate == null ||
    student.classId === 0
  ) {
    return false;
  }
  return true;
}
