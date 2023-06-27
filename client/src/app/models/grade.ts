export class Grade {
    constructor(
        public gradeId: string,
        public subject: string,
        public date: Date,
        public assessment: string,
        public score: number,
        public baseScore: number,
        public percentageScore: number,
        public format: string,
        public studentId: number,
    ) { };
}