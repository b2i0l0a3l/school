export type Exam = {
    id: number;
    title: string;
    date: string;
    subjectId: number;
    subject?: string;
    maxScore: number;
    status?: string;
};
