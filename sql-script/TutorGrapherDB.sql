CREATE DATABASE IF NOT EXISTS tutorgrapher;

USE tutorgrapher;

CREATE TABLE tutor (
    tutorId INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    salutation VARCHAR(10) NOT NULL,
    phone INT NOT NULL,
    email VARCHAR(50) NOT NULL,
    photo LONGBLOB,
    PRIMARY KEY (tutorId)
);

INSERT INTO tutor (firstName, lastName, salutation, phone, email)
VALUES ('Tofu', 'Cube', 'Ms.', 91112222, 'tofuyong@gmail.com');

CREATE TABLE student (
    studentId INT NOT NULL,
    isActive BOOLEAN,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    dob Date,
    phone INT,
    email VARCHAR(50),
    photo BLOB,
    school VARCHAR(50) NOT NULL,
    level VARCHAR(20) NOT NULL,
    year INT NOT NULL,
    band VARCHAR(30) NOT NULL,
    cca VARCHAR(30) NOT NULL,
    interests VARCHAR(100),
    tutorId INT NOT NULL,
    PRIMARY KEY (studentId),
    FOREIGN KEY (tutorId) REFERENCES tutor(tutorId)
);

INSERT INTO student (studentId, isActive, firstName, lastName, gender, dob, phone, email, school, level, year, band, cca, interests, tutorId)
VALUES ('10001', true, 'Pebbles', 'Flintstone', 'Female', '1963-02-12', '91112222', 'pebblesflintstone@students.com', 'Punggol Secondary School', 'Secondary', 1, 'Express', 'Outdoor Activity Club', 'Rock climbing', 5);
INSERT INTO student (studentId, isActive, firstName, lastName, gender, dob, phone, email, school, level, year, band, cca, interests, tutorId)
VALUES ('10002', true, 'Bugs', 'Bunny', 'Male', '1940-07-27', '91113333', 'bugsbunny@students.com', 'Broadrick Secondary School', 'Secondary', 1, 'Express', 'Cooking Club', 'Eating Carrots', 5);
INSERT INTO student (studentId, isActive, firstName, lastName, gender, dob, phone, email, school, level, year, band, cca, interests, tutorId)
VALUES ('10003', true, 'Daffy', 'Duck', 'Male', '1937-04-17', '91114444', 'daffyduck@students.com', 'Dunman High', 'Secondary', 1, 'Express', 'Swimming Club', 'Water Polo', 5);
INSERT INTO student (studentId, isActive, firstName, lastName, gender, dob, phone, email, school, level, year, band, cca, interests, tutorId)
VALUES ('10004', true, 'Scooby', 'Doo', 'Male', '1969-09-13', '91115555', 'scoobydoo@students.com', 'Serangoon Secondary School', 'Secondary', 1, 'Express', 'NPCC', 'Reading comics', 5);
INSERT INTO student (studentId, isActive, firstName, lastName, gender, dob, phone, email, school, level, year, band, cca, interests, tutorId)
VALUES ('10005', true, 'Minnie', 'Mouse', 'Female', '1928-11-18', '91116666', 'minniemouse@students.com', 'Mayflower Secondary School', 'Secondary', 1, 'Express', 'Girl Guides', 'Sewing', 5);
INSERT INTO student (studentId, isActive, firstName, lastName, gender, dob, phone, email, school, level, year, band, cca, interests, tutorId)
VALUES ('10006', true, 'Daisy', 'Duck', 'Male', '1937-01-09', '91117777', 'daisyduck@students.com', 'Deyi Secondary School', 'Secondary', 1, 'Express', 'Netball', 'Bowling', 5);
INSERT INTO student (studentId, isActive, firstName, lastName, gender, dob, phone, email, school, level, year, band, cca, interests, tutorId)
VALUES ('10007', true, 'Winnie', 'Pooh', 'Male', '1926-10-14', '91118888', 'winniethepooh@students.com', 'Westspring Secondary School', 'Secondary', 1, 'Express', 'Football', 'Collecting honey', 5);

CREATE TABLE grade (
    gradeId VARCHAR(10) NOT NULL,
    subject VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    assessment VARCHAR(20) NOT NULL,
    score DECIMAL(10,1) NOT NULL,
    baseScore DECIMAL(10,1) NOT NULL,
    percentageScore DECIMAL(5,2),
    format VARCHAR(100),
    studentId INT NOT NULL,
    PRIMARY KEY (gradeId),
    FOREIGN KEY (studentId) REFERENCES student(studentId)
);

CREATE TABLE lesson (
    lessonId VARCHAR(40) NOT NULL,
    subject VARCHAR(30),
    dayOfWeek VARCHAR(10),
    duration VARCHAR(10),
    startTime VARCHAR(10),
    endTime VARCHAR(10),
    hourlyRate INT,
    address VARCHAR(100),
    postalCode INT,
    studentId INT NOT NULL,
    PRIMARY KEY (lessonId),
    FOREIGN KEY (studentId) REFERENCES student(studentId)
);

CREATE TABLE observation (
    observationId VARCHAR(20) NOT NULL,
    date DATE NOT NULL,
    notes VARCHAR(1000),
    studentId INT NOT NULL,
    PRIMARY KEY (observationId),
    FOREIGN KEY (studentId) REFERENCES student(studentId)
);

CREATE TABLE report (
    reportId VARCHAR(20) NOT NULL,
    date DATE NOT NULL,
    reportUrl VARCHAR(100),
    studentId INT NOT NULL,
    PRIMARY KEY (reportId),
    FOREIGN KEY (studentId) REFERENCES student(studentId)
);

CREATE TABLE holidays (
    holidayId INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    start Date NOT NULL,
    end Date NOT NULL,
    allDay Boolean NOT NULL,
    PRIMARY KEY (holidayId)
);

/* 2023 dates */
INSERT INTO holidays (title, type, start, end, allDay)
VALUES ("New Year's Day", "PH", "2023-01-01", "2023-01-01", true);
INSERT INTO holidays (title, type, start, end, allDay)
VALUES ("Chinese New Year", "PH", "2023-01-22", "2023-01-23", true);
INSERT INTO holidays (title, type, start, end, allDay)
VALUES ("Good Friday", "PH", "2023-04-07", "2023-04-07", true);
INSERT INTO holidays (title, type, start, end, allDay)
VALUES ("Hari Raya Puasa", "PH", "2023-04-22", "2023-04-22", true);
INSERT INTO holidays (title, type, start, end, allDay)
VALUES ("Labour Day", "PH", "2023-05-01", "2023-05-01", true);
INSERT INTO holidays (title, type, start, end, allDay)
VALUES ("Vesak Day", "PH", "2023-06-02", "2023-06-02", true);
INSERT INTO holidays (title, type, start, end, allDay)
VALUES ("Hari Raya Haji", "PH", "2023-06-29", "2023-06-29", true);
INSERT INTO holidays (title, type, start, end, allDay)
VALUES ("National Day", "PH", "2023-08-09", "2023-08-09", true);
INSERT INTO holidays (title, type, start, end, allDay)
VALUES ("Deepavali", "PH", "2023-11-12", "2023-11-12", true);
INSERT INTO holidays (title, type, start, end, allDay)
VALUES ("Christmas Day", "PH", "2023-12-25", "2023-12-25", true);

INSERT INTO holidays (title, type, start, end, allDay)
VALUES ("Youth Day", "SH", "2023-07-02", "2023-07-03", true);
INSERT INTO holidays (title, type, start, end, allDay)
VALUES ("National Day School Holiday", "SH", "2023-08-10", "2023-08-10", true);
INSERT INTO holidays (title, type, start, end, allDay)
VALUES ("Teacher's Day", "SH", "2023-09-01", "2023-09-01", true);
INSERT INTO holidays (title, type, start, end, allDay)
VALUES ("Children's Day", "SH", "2023-10-06", "2023-10-06", true);

INSERT INTO holidays (title, type, start, end, allDay)
VALUES ("March School Holidays", "TH", "2023-03-11", "2023-03-19", true);
INSERT INTO holidays (title, type, start, end, allDay)
VALUES ("June School Holidays", "TH", "2023-05-27", "2023-06-25", true);
INSERT INTO holidays (title, type, start, end, allDay)
VALUES ("September School Holidays", "TH", "2023-09-02", "2023-09-10", true);
INSERT INTO holidays (title, type, start, end, allDay)
VALUES ("Year End School Holidays", "TH", "2023-11-18", "2023-12-31", true);

/* 2024 dates */
INSERT INTO holidays (title, type, start, end, allDay)
VALUES ("New Year's Day", "PH", "2024-01-01", "2024-01-01", true);
INSERT INTO holidays (title, type, start, end, allDay)
VALUES ("Chinese New Year", "PH", "2024-02-10", "2024-02-11", true);
INSERT INTO holidays (title, type, start, end, allDay)
VALUES ("Good Friday", "PH", "2024-03-29", "2024-03-29", true);
INSERT INTO holidays (title, type, start, end, allDay)
VALUES ("Hari Raya Puasa", "PH", "2024-04-10", "2024-04-10", true);
INSERT INTO holidays (title, type, start, end, allDay)
VALUES ("Labour Day", "PH", "2024-05-01", "2024-05-01", true);
INSERT INTO holidays (title, type, start, end, allDay)
VALUES ("Vesak Day", "PH", "2024-05-22", "2024-05-22", true);
INSERT INTO holidays (title, type, start, end, allDay)
VALUES ("Hari Raya Haji", "PH", "2024-06-17", "2024-06-17", true);
INSERT INTO holidays (title, type, start, end, allDay)
VALUES ("National Day", "PH", "2024-08-09", "2024-08-09", true);
INSERT INTO holidays (title, type, start, end, allDay)
VALUES ("Deepavali", "PH", "2024-10-31", "2024-10-31", true);
INSERT INTO holidays (title, type, start, end, allDay)
VALUES ("Christmas Day", "PH", "2024-12-25", "2024-12-25", true);

INSERT INTO holidays (title, type, start, end, allDay)
VALUES ("Youth Day", "SH", "2024-07-01", "2024-07-01", true);
INSERT INTO holidays (title, type, start, end, allDay)
VALUES ("National Day School Holiday", "SH", "2024-08-08", "2024-08-08", true);
INSERT INTO holidays (title, type, start, end, allDay)
VALUES ("Teacher's Day", "SH", "2024-08-31", "2024-08-31", true);
INSERT INTO holidays (title, type, start, end, allDay)
VALUES ("Children's Day", "SH", "2024-10-04", "2024-10-04", true);

INSERT INTO holidays (title, type, start, end, allDay)
VALUES ("March School Holidays", "TH", "2024-03-09", "2024-03-17", true);
INSERT INTO holidays (title, type, start, end, allDay)
VALUES ("June School Holidays", "TH", "2024-05-25", "2024-06-23", true);
INSERT INTO holidays (title, type, start, end, allDay)
VALUES ("September School Holidays", "TH", "2024-08-31", "2024-09-08", true);
INSERT INTO holidays (title, type, start, end, allDay)
VALUES ("Year End School Holidays", "TH", "2024-11-16", "2024-12-31", true);
