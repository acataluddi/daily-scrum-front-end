export class Project {
    members:string[];
    numberOfMembers: Number;
    projectName: string;
    projectDesc:string;
    constructor(projectName:string, projectDesc:string) {
        this.projectName = projectName;
        this.projectDesc = projectDesc;
    }
}
