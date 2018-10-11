import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { Project, member } from "../model/project-model"
import { ProjectService } from "../service/project.service";
import { Employee } from "../model/member-model";
import { AuthService } from 'angular-6-social-login';
import { LoginService } from "../service/login.service";
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DashboardService } from "../service/dashboardservice.service";


@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

    modalRef: BsModalRef;
    project: Project;
    count: number;
    posted: number;
    lastMember: member;
    reqType: string;
    buttonText: string;
    pId;
    pName;
    pDesc;
    pMembers;
    flag = false;
    show = [];
    Members : Employee;
    invalidProjectName = false;
    invalidMemberLength = false;
    memberRepeat = false;
    validMail = false;
    validRole = false;

    public show1: boolean = true;
    public show2: boolean = true;
    showAddMember: boolean;

    constructor(
        public router: Router,
        private projectservice: ProjectService,
        private socialAuthService: AuthService,
        private loginservice: LoginService,
        private modalService: BsModalService,
        private dashboardservice: DashboardService) { }

    ngOnInit() {
        this.validMail = false;
        this.validRole = false;
        this.invalidProjectName = false;
        this.invalidMemberLength = false;
        this.memberRepeat = false;

        this.socialAuthService.authState.subscribe((user) => {
            if (user != null) {
                this.loginservice.loginMember(user.idToken)
                    .subscribe(msg => {
                        msg.userType;
                        if (msg.userType === "Admin" || msg.userType === "Manager") {
                            this.flag = true;
                            setTimeout(() => { document.getElementById("projectname").focus(); });
                        }

                    });
            }
        });
        this.count = 0;
        this.posted = 0;
        this.showAddMember = false;
        this.reqType = this.projectservice.getRequestType();
        if (this.reqType === 'update') {
            this.buttonText = 'Update Project';
            this.project = this.initializeNewProject(this.project);
            var proId = this.projectservice.getProjectToBeUpdated();
            this.dashboardservice.getProjects()
                .subscribe(projectArr => {
                    if (projectArr != null) {
                        for (let p of projectArr) {
                            if (p.projectId === proId) {
                                this.pId = p.projectId;
                                this.pName = p.projectName;
                                this.pDesc = p.projectDesc;
                                this.pMembers = p.members;
                                for (let mb of this.pMembers) {
                                    mb.roleSelected = true;
                                    this.project.members.push(mb);
                                }
                                this.project.projectId = this.pId;
                                this.project.projectName = this.pName;
                                this.project.projectDesc = this.pDesc;
                                this.show1 = false;
                                this.showAddMember = true;
                                break;
                            }
                        }
                    }
                });
        } else if (this.reqType === 'add') {
            this.buttonText = 'Create Project';
            this.project = this.initializeNewProject(this.project);
        }
        this.projectservice.getMembers()
           .subscribe(memberArr => {
                 if (memberArr != null) {
                    this.getMembers(memberArr)
                }
            });
          
    }

    generateId() {
        var date = new Date();
        var concat;
        concat = date.getFullYear().toString();
        concat += date.getMonth().toString();
        concat += date.getDate().toString();
        concat += date.getHours().toString();
        concat += date.getMinutes().toString();
        concat += date.getSeconds().toString();
        concat += date.getMilliseconds().toString();
        return concat;

    }

    changeVisibility1() {
        this.show1 = !this.show1;
        setTimeout(() => { document.getElementById("projectdescription").focus(); });
    }

    changeVisibility2() {
        this.show2 = !this.show2;
        this.count++;
    }


    cancel(): void {
        if (this.reqType == 'update') {
            this.project.projectId = this.pId;
            this.project.projectName = this.pName;
            this.project.projectDesc = this.pDesc;
            for (let mb of this.pMembers) {
                this.project.members = [];
                this.project.members.push(mb);
            }
            this.show1 = false;
        } else if (this.reqType == 'add') {
            this.project = this.initializeNewProject(this.project);
            this.show1 = true;
        }
        this.modalRef.hide();
        this.router.navigate(['/dashboard']);
    }

    initializeNewMember(m: member): member {
        m.email = "";
       
        m.role = "Select role";
        m.isActive = true;
        return m;
    }

    initializeNewProject(newProject: Project): Project {
        newProject = {
            projectId: this.generateId(),
            projectDesc: "",
            members: [],
            projectName: "",
            startDate: "",
            endDate: ""
        }
        return newProject;
    }

    addNewMem() {
        var me = new member();
        me = this.initializeNewMember(me);
      
        var membersLength = this.project.members.length;
        if (membersLength > 0) {
            this.lastMember = this.project.members[membersLength - 1];
            if (this.hasDuplicates(this.project.members)) {
                this.memberRepeat = true;
            }
            if (!this.isValidEmail(this.lastMember.email)) {
                this.lastMember.invalidMemberEmail = true;
            }
            if (this.lastMember.role === '' || this.lastMember.role === 'Select role') {
                this.lastMember.invalidRole = true;
            }
            if (this.lastMember.email !== '' && this.isValidEmail(this.lastMember.email) &&
                this.memberRepeat === false &&
                (this.lastMember.role !== '' && this.lastMember.role !== 'Select role')) {
                this.project.members.push(me);
                setTimeout(() => { document.getElementById("mail" + me.email).focus(); });
            } else {
                var elmnt = document.getElementById("projectmembers");
                elmnt.scrollIntoView(true);
                document.getElementById("projectmembers").classList.add('high-light-element');
                setTimeout(function () {
                    document.getElementById("projectmembers").classList.remove('high-light-element');
                }, 280);
            }
        } else if (membersLength === 0) {
            this.project.members.push(me);
            setTimeout(() => { document.getElementById("mail" + me.email).focus(); });
        }
    }

    onRoleChange(type, mem: member) {
        mem.roleSelected = true;
        mem.invalidRole = false;
    }

    delete(m: member): void {
        m.invalidMemberEmail = false;
        m.invalidRole = false;
        this.memberRepeat = false;
        m.roleSelected = false;
        for (let memb in this.project.members) {
            if (this.project.members[parseInt(memb)].email === m.email &&
                this.project.members[parseInt(memb)].role === m.role) {
                this.project.members.splice(parseInt(memb), 1);
                break;
            }
        }
        if (this.project.members.length === 0) {
            this.showAddMember = false;
        }
    }

    addOrModifyProject() {
        this.memberRepeat = false;
        this.invalidProjectName = false;
        this.invalidMemberLength = false;
        this.project.projectDesc = this.project.projectDesc.trim();
        this.project.projectName = this.project.projectName.trim();
        this.validMail = true;
        this.validRole = true;
        for (let memb of this.project.members) {
            if (!this.isValidEmail(memb.email)) {
                memb.invalidMemberEmail = true;
                this.validMail = false;
            }
            if (memb.role === '' || memb.role === 'Select role') {
                memb.invalidRole = true;
                this.validRole = false;
            }
        }

        if (this.hasDuplicates(this.project.members)) {
            this.memberRepeat = true;
        }
        if (this.project.projectName === '') {
            this.invalidProjectName = true;
        }
        if (this.project.members.length === 0) {
            this.invalidMemberLength = true;
        }
        if (this.invalidProjectName === true) {
            var elmnt = document.getElementById("projectname");
            elmnt.scrollIntoView(false);
            document.getElementById("projectname").classList.add('high-light-element');
            setTimeout(function () {
                document.getElementById("projectname").classList.remove('high-light-element');
            }, 280);
        } else if (this.invalidMemberLength === true) {
            var elmnt = document.getElementById("addmember");
            elmnt.scrollIntoView(true);
            document.getElementById("addmember").classList.add('high-light-element');
            setTimeout(function () {
                document.getElementById("addmember").classList.remove('high-light-element');
            }, 280);
        } else if (this.validMail === false || this.validRole === false) {
            var elmnt = document.getElementById("projectmembers");
            elmnt.scrollIntoView(true);
            document.getElementById("projectmembers").classList.add('high-light-element');
            setTimeout(function () {
                document.getElementById("projectmembers").classList.remove('high-light-element');
            }, 280);
        }
        if (this.invalidProjectName === false &&
            this.invalidMemberLength === false &&
            this.validMail === true &&
            this.validRole === true &&
            this.hasDuplicates(this.project.members) != true) {
            if (this.reqType === 'add') {
                this.projectservice.addProject(this.project).subscribe(
                    (data: any) => {
                        if (data.projectId === this.project.projectId) {
                            console.log('Project added successfully');
                            this.router.navigate(['/dashboard']);
                        }
                        else {
                            console.log('Some error occured please try again.');
                        }
                    });
            } else if (this.reqType === 'update') {
                this.projectservice.updateProject(this.project).subscribe(
                    (msg) => {
                        if (msg.message === "Project Edited Successfully") {
                            console.log('Project Edited Successfully');
                            this.router.navigate(['/dashboard']);
                        }
                        else {
                            console.log('Some error occured please try again.');
                        }
                    });
            } else {
                console.log('Some error occured please try again.');
            }
        } else {
            console.log('Please fill in all project details');
        }
        this.validMail = false;
        this.validRole = false;
    }

    hasDuplicates(array) {
        var valuesSoFar = Object.create(null);
        for (var i = 0; i < array.length; ++i) {
            var value = array[i].email;
            if (value in valuesSoFar || value === localStorage.getItem("email") && this.reqType == 'add') {
                return true;
            } else if (value in valuesSoFar && this.reqType == 'update') {
                return true;
            }
            valuesSoFar[value] = true;
        }
        return false;
    }

    validteEmailOnBlur(m: member) {
        if (!this.isValidEmail(m.email)) {
            m.invalidMemberEmail = true;
        }
    }


    isValidEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    }

    decline(): void {
        this.modalRef.hide();
    }
    getMembers(memberArr) {
        this.Members = memberArr;

    }
    dropdown(index) {
        this.show[index] = !this.show[index];
    }
    changeProject(newMailId,mem:member) {
        mem.email = newMailId;
        mem.invalidMemberEmail=false;
      }
}
