export class Project {
    projectId:string;
    projectName: string;
    projectDesc:string;
    members:string[];
    numberOfMembers: Number;
    
    constructor(projectId:string, projectName:string, projectDesc:string) {
        this.projectId = projectId;
        this.projectName = projectName;
        this.projectDesc = projectDesc;
        // this.members = members;
    }
}
