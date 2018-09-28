
export class Project {
    projectId: string;
    projectName: string;
    projectDesc: string;
    startDate : string;
    endDate : string;
    members: member[];

}
export class member {
    email: string;
    role: string;
    name: string;
    image: string;
    addedDate : string;
    deletedDate : string;
    isActive : boolean;
    roleSelected : boolean;
    invalidMemberEmail : boolean;
    invalidRole : boolean;
}

