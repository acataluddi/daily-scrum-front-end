export class Project {
    members:string[];
    numberOfMembers: Number;
    name: string;
    projectdescription:string;
    constructor(projectname:string, projectdescription:string) {
        this.name = projectname;
        this.projectdescription = projectdescription;
    }
}
