import { Task } from './task-model';
export class IndividualMember {
  name: string;
  email: string;
  hour: number;
  minute: number;
  image: string;
  tasks: Task[];
  addedDate: string;
  deletedDate: string;
  isActive: boolean;
  showMember: boolean;
}