export class Course {
    ExamID: string;
    CourseID: string;
    ExamName: string;
    ExamTeacher: string;
    Year: string;
    Simester: string;
    Moed: string;
    ExamDate: string;
    CourseExamStatus: number;
    NumOfStudents: number;
    NumOfFinishedStudents: number;
    NumOfInProgressStudents: number;
    ExamGradePublishDate: string;
    ExamAvarage: number;
    ExamStandardDeviation: number;
    CourseAttachmentsLinks: any;
    CourseStaffComments: any;
    CourseParticipant: any;
    QuestionsKeys: any;
    ExamFactor: number;

    public static createCourseFromJson(courseJson: any): Course {
        let res: Course = new Course();
        res.ExamID = courseJson.ExamID;
        res.CourseID = courseJson.CourseID;
        res.ExamName = courseJson.ExamName;
        res.ExamTeacher = courseJson.ExamTeacher;

        return res;
    }
}
