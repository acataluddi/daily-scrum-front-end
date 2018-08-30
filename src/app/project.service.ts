import { Injectable } from '@angular/core';
import { Project } from '../app/model/project-model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor() { }

  projects: Project[]=[
    { name:"FR Project LXXXI - Core Order Management System", members:[], numberOfMembers:null },
    { name:"FR Project LXXXI - Core Order Management System", members:[], numberOfMembers:null },
    { name:"FR Project LXXXI - Core Order Management System", members:[], numberOfMembers:null },
    { name:"MS Dynamics CRM Implementation project for Enable - Ametek HKP", members:[], numberOfMembers:null},
    { name:"MS Dynamics CRM Implementation project for Enable - Ametek HKP", members:[], numberOfMembers:null},
    { name:"MS Dynamics CRM Implementation project for Enable - Ametek HKP", members:[], numberOfMembers:null},
    { name:"FR Project LXXXI - Core Order Management System", members:[], numberOfMembers:null},
    { name:"FR Project LXXXI - Core Order Management System", members:[], numberOfMembers:null},
    { name:"FR Project LXXXI - Core Order Management System", members:[], numberOfMembers:null},
    { name:"FR Project LXXXI - Core Order Management System", members:[], numberOfMembers:null}
  ];

  getProjects():Project[]{
    return this.projects;
  }
   
}
