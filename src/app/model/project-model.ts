// export class Project {
//     members: string[];
//     numberOfMembers: Number;
//     name: string;
// }
export class Project {
    projectId:string;
    projectName: string;
    projectDesc:string;
    members:member[];
}
export class member{ 
    email:string;
    role:string;
}
