export class ProjectUpdated {
    projectId: string;
    members: member[];
    projectDesc: string;
    projectName: string;
}

class member {
    email: string;
    role: string;
}