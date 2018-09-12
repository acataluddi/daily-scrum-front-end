import { Injectable } from '@angular/core';
import { Project} from '../app/model/project-model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor() { }

  reqType:string;
  projectToBeUpdated:Project;

  projects: Project[] = [
    {
      "projectId": "4092018122459",
      "projectName": "FR Project VIII - EU",
      "projectDesc": "This project is to customize the existing Taiwanese FR Single Page Application to get it readied for release in EU region with French, German and English language support and some other functional changes in web and cms.",
      "members": [
          {
              "email": "ronyc@qburst.com",
              "role": "Manager"
          },
          {
              "email": "neerajd@qburst.com",
              "role": "Developer"
          },
          {
              "email": "nisha@qburst.com",
              "role": "Developer"
          },
          {
              "email": "arathi@qburst.com",
              "role": "Team Lead"
          },
          {
              "email": "sanjo@qburst.com",
              "role": "Developer"
          },
          {
              "email": "athiram@qburst.com",
              "role": "Developer"
          },
          {
              "email": "sruthy@qburst.com",
              "role": "Tester"
          },
          {
              "email": "nithaa@qburst.com",
              "role": "Manager"
          },
          {
              "email": "sunil@qburst.com",
              "role": "Manager"
          },
          {
              "email": "nithin@qburst.com",
              "role": "Tester"
          },
          {
              "email": "akhils@qburst.com",
              "role": "Team Lead"
          }
      ]
  },
  {
      "projectId": "4092018047620",
      "projectName": "WAFRA Investment Advisory Group, Inc (Milagro Coral Gables)",
      "projectDesc": "This project involves the yearly hosting and development for the Blog page of Milagro Coral Gables - which is a Bozzuto managed property. Minor changes and fixes are also in scope and will be completed at the prevailing development rates.",
      "members": [
          {
              "email": "ronyc@qburst.com",
              "role": "Manager"
          },
          {
              "email": "neerajd@qburst.com",
              "role": "Developer"
          },
          {
              "email": "nisha@qburst.com",
              "role": "Developer"
          },
          {
              "email": "arathi@qburst.com",
              "role": "Team Lead"
          },
          {
              "email": "athiram@qburst.com",
              "role": "Developer"
          },
          {
              "email": "sruthy@qburst.com",
              "role": "Tester"
          },
          {
              "email": "nithaa@qburst.com",
              "role": "Manager"
          },
          {
              "email": "sunil@qburst.com",
              "role": "Manager"
          },
          {
              "email": "nithin@qburst.com",
              "role": "Tester"
          },
          {
              "email": "akhils@qburst.com",
              "role": "Team Lead"
          }
      ]
  },
  {
      "projectId": "2018879625724",
      "projectName": "Adastria Basket",
      "projectDesc": "This project aims at creating a Back-end Basket API for Adastria.",
      "members": [
          {
              "email": "sanjo@qburst.com",
              "role": "Developer"
          },
          {
              "email": "ronyc@qburst.com",
              "role": "Project Manager"
          }
      ]
  },
  {
      "projectId": "20188792518736",
      "projectName": "Orion India Systems Pvt Ltd",
      "projectDesc": "Maintenance & Enhancement of KPMG audit software for the Auditees. Project Deliverable and team management are Orion?s responsibility.\n\nOrion will decide on whether to release or retain the resources after 2 weeks as all except one resource doesn't have required skill (AngularJS).\n",
      "members": [
          {
              "email": "mathew@qburst.com",
              "role": "Project Manager"
          },
          {
              "email": "zakiya@qburst.com",
              "role": "Developer"
          },
          {
              "email": "akshayr@qburst.com",
              "role": "Developer"
          },
          {
              "email": "abhijithk@qburst.com",
              "role": "Developer"
          },
          {
              "email": "sooryan@qburst.com",
              "role": "Developer"
          },
          {
              "email": "neenuj@qburst.com",
              "role": "Developer"
          }
      ]
  }
  ];

  getProjects(): Project[] {
    return this.projects;
  }

  setRequestType(rtype: string) {
    this.reqType = rtype;
    }
  setProjectToBeUpdated(p:Project) {
    this.projectToBeUpdated = p;
  }

}
