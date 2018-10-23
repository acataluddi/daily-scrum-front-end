export class Goal {
    goalId: string;
    goalTime: string;
    goalTitle: string;
    goalDescription: string;
    managerEmail: string;
    managerName: string;
    managerImage: string;
    userEmail: string;
    comments: Comment[];
    hasNewUpdates: boolean;
}

export class Comment {
    commentId: string;
    goalId: string;
    commentDescription: string;
    commentTime: string;
    memberName: string;
    memberEmail: string;
    memberImage: string;
    userEmail: string;
}

export class GoalMember {
    id: String;
    userId: String;
    userName: String;    
    userEmail: String;
    userImage: String;    
    lastUpdate: String;
    hasNewUpdates: boolean;
    goals: Goal[];
}