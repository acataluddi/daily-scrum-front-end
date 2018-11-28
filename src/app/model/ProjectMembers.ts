export class ProjectMember {
  id: number;
  email: string;

  constructor(email: string, role: string) {
    this.email = email;
  }
}