import { v4 as uuidv4 } from 'uuid';
import { Issue, IssueStatus, IssueType } from '../types/Issue';
import { parseString } from 'xml2js';

export const generateUniqueId = () => {
  return uuidv4();
};

export const statusTranslation = (status: string) => {
  switch (status) {
    case 'open':
      return 'Open'
    case 'in_progress':
      return 'In Progress'
    case 'done':
      return 'Done'
    default:
      return 'Unknown'
  }
}

export const parseXmlString = (xmlString: string): Issue[] => {
  try {
    let issues: Issue[] = [];

    parseString(xmlString, { explicitArray: false }, (err, result) => {
      if (err) {
        console.error('Error parsing XML:', err);
        return;
      }

      const meeting = result.meeting;
      console.log('meeting', meeting);
      if (meeting && meeting.issue) {
        issues = meeting.issue.map((xmlIssue: any) => ({
          title: xmlIssue.title,
          description: xmlIssue.description,
          anonymous_assignee: xmlIssue.assignee,
          issueType: IssueType.STORY,
          storyPoints: xmlIssue['story-points'].point ? parseInt(xmlIssue['story-points'].point) : undefined,
          status: IssueStatus.OPEN
        }));
      }
    });

    return issues;
  } catch (error) {
    console.error('Error during XML parsing:', error);
    return [];
  }
};