export class ReportDto {
    userId: number;
    reportContent: string;
    responseFromManagement: string;

    constructor(userId: number, reportContent: string, responseFromManagement: string) {
        this.userId = userId;
        this.reportContent = reportContent;
        this.responseFromManagement = responseFromManagement;
    }
}