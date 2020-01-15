import { Component, OnInit, EventEmitter, Output, Input, HostListener } from '@angular/core';
import { ProjectService } from '../service/project.service'
import { Project, member } from '../model/project-model'
import { Member } from '../model/member-model';
import { Router } from '@angular/router';
import { NavigationdataService } from '../service/navigationdata.service'
import { Subscription } from 'rxjs';
import { DashboardService } from '../service/dashboardservice.service';
import { ProcessIndividualTaskService } from '../service/process-individual-task.service';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css']
})
export class UserslistComponent implements OnInit {

  @Output() selectedEmailEvent = new EventEmitter();
  @Input() childProject: string;
  @Input() childProjectId: string;
  op: number = 0;
  ngOnChanges(...args: any[]) {
    if (this.op > 0) {
      this.getProjects();
    }
    this.op++;
  }
  public members: Member[] = [];
  public loggedmembers: Member[];
  public projects: Project[];
  checker: boolean = false;
  public projectmembers: member[];
  subscription: Subscription;
  constructor(public router: Router,
    private dashboardservice: DashboardService,
    private projectservice: ProjectService,
    private data: NavigationdataService,
    private taskservice: ProcessIndividualTaskService) {
  }
  ngOnInit() {
    this.subscription = this.dashboardservice.getProjects().subscribe(data => {
      this.setProjects(data)
    });
    this.onWindowScroll();
  }

  setProjects(projects) {
    this.projects = projects;
    this.getProjects();
  }

  getProjects(): void {
    for (let pro of this.projects) {
      if (pro.projectName == this.childProject) {
        this.projectmembers = pro.members;
      }
    }
    for (let mem of this.projectmembers) {
      if (mem.name == '') {
        var index = this.projectmembers.indexOf(mem);
        this.projectmembers.splice(index, 1);
      }
    }
  }

  gotoDailyStatus(selectedMember) {
    this.selectedEmailEvent.emit(selectedMember)
    this.data.changedata(selectedMember)
    this.router.navigate(['/daily-status', this.childProjectId, this.childProject]);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    let number = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;
    if (number > 0) {
      this.checker=false;
    }
  }
}
