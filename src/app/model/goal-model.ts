export class Goal {
    goalId: string;
    goalTime: Date;
    goalTitle: string;
    goalDescription: string;
    managerEmail: string;
    managerName: string;
    managerImage: string;
    userEmail: string;
	hasNewUpdatesForUser: boolean;
	hasNewUpdatesForManager: boolean;
    comments: Comment[];
}

export class Comment {
    commentId: string;
    goalId: string;
    commentDescription: string;
    commentTime: Date;
    memberName: string;
    memberEmail: string;
    memberImage: string;
    userEmail: string;
}

export class GoalMember {
    id: string;
    userId: string;
    userName: string;    
    userEmail: string;
    userImage: string;    
    lastUpdate: Date;
    hasNewUpdates: boolean;
    goals: Goal[];
}
