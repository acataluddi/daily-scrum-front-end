import { Injectable } from '@angular/core';
import { Project , newProject} from '../app/model/project-model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor() { }

  reqType:string;
  projectToBeUpdated:newProject;

  projects: Project[] = [
    { name: "FR Project LXXXI - Core Order Management System", members: [], numberOfMembers: null },
    { name: "FR Project LXXXI - Core Order Management System", members: [], numberOfMembers: null },
    { name: "FR Project LXXXI - Core Order Management System", members: [], numberOfMembers: null },
    { name: "MS Dynamics CRM Implementation project for Enable - Ametek HKP", members: [], numberOfMembers: null },
    { name: "MS Dynamics CRM Implementation project for Enable - Ametek HKP", members: [], numberOfMembers: null },
    { name: "MS Dynamics CRM Implementation project for Enable - Ametek HKP", members: [], numberOfMembers: null },
    { name: "FR Project LXXXI - Core Order Management System", members: [], numberOfMembers: null },
    { name: "FR Project LXXXI - Core Order Management System", members: [], numberOfMembers: null },
    { name: "FR Project LXXXI - Core Order Management System", members: [], numberOfMembers: null },
    { name: "FR Project LXXXI - Core Order Management System", members: [], numberOfMembers: null }
  ];

  getProjects(): Project[] {
    return this.projects;
  }

  setRequestType(rtype: string) {
    this.reqType = rtype;
    }
  setProjectToBeUpdated(p: newProject) {
    this.projectToBeUpdated = p;
  }

}
