import { User } from "./User";

export enum IssueStatus {
  OPEN="open",
  IN_PROGRESS="in_progress",
  DONE="done",
}

export enum IssueType {
  TASK="task",
  BUG="bug",
  STORY="story",
}

export type Issue = {
  title: string;
  description: string;
  issueType: IssueType;
  assignee_id?: string;
  anonymous_assignee?: string;
  storyPoints?: number;
  status?: IssueStatus;
};