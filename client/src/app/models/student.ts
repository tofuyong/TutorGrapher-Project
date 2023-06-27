export class Student {
    constructor(
        public studentId: number,
        public isActive: boolean,
        public firstName: string,
        public lastName: string,
        public gender: string,
        public dob: Date,
        public phone: number,
        public email: string,
        public school: string,
        public level: string,
        public year: number,
        public band: string,
        public cca: string,
        public interests: string,
        public tutorId: number
    ) { };
}