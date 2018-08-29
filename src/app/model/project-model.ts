export class Project {
    members:string[];
    numberOfMembers: Number;
    name: string;
    projectdescription:string;
    constructor(name:string, projectdescription:string) {
        this.name = name;
        this.projectdescription = projectdescription;
    }
}
