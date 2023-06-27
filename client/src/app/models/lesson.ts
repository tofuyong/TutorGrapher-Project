export class Lesson {
    constructor(
        public lessonId: string,
        public subject: string,
        public dayOfWeek: string,
        public duration: number,
        public startTime: string,
        public endTime: string,
        public hourlyRate: number,
        public address: string,
        public postalCode: string,
        public studentId: string
    ) { };
}