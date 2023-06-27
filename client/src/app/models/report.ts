export class Report {
    constructor(
        public reportId: string,
        public date: Date,
        public reportUrl: string,
        public studentId: number,
        public studentFirstName: string,
        public studentLastName: string
    ) { };
}