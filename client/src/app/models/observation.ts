export class Observation {
    constructor(
        public observationId: string,
        public date: Date,
        public notes: string,
        public studentId: number
    ) { };
}