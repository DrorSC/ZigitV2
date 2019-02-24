export class Student {
    ParId: string;
    ParGrade: string;
    CheckerComments: string;
    ParLinkToExamFile: string;
    CheckerAssitantArray: string;
    ExamTeacher: string;
    ParExamStatus: number;

    public static createStudentFromJson(studentJson: any): Student {
        let res: Student = new Student();
        res.ParId = studentJson.ParId;
        res.ParExamStatus = studentJson.parExamStatus;

        return res;
    }
}