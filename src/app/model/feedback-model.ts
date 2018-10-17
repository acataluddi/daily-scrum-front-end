export class Feedback {
    feedbackId: string;
    feedbackDate: string;
    feedbackDescription: string;
}

export class FeedbackMember {
    userId: string;
    userName: string;
    userEmail: string;
    userImage: string;
    lastUpdate: string;
    hasNewUpdates: boolean;
    feedbacks: Feedback[];
}