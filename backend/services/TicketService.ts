import { parseXmlString } from "../../helper";
import { Issue } from "../../types/Issue";
import { PersistentIssue } from "../../types/Models";
import IssueRepository from "../repositories/IssueRepository";
import BaseService from "./BaseService";

class TicketService extends BaseService {

    private issueRepository: IssueRepository;

    constructor() {
        super();
        this.issueRepository = new IssueRepository();
    }

    public async create(issue: Issue): Promise<PersistentIssue> {
        try {
            return this.issueRepository.create(issue);
        } catch (error) {
            throw new Error("Error in TicketService.createTicket()");
        }
    }

    public async retrieveSingle(issueId: string): Promise<PersistentIssue> {
        try {
            const issue = this.issueRepository.getOne(issueId);
            if (!issue) {
                throw new Error('Issue not found');
            }
            return issue
        } catch (error) {
            throw new Error("Error in TicketService.getTicket()");
        }
    }

    public async update(issueId: string, issue: Issue): Promise<PersistentIssue> {
        try {
            const issueToUpdate = this.issueRepository.getOne(issueId);

            if (!issueToUpdate) {
                throw new Error('Issue not found');
            }
            const updatedIssue = {
                ...issueToUpdate,
                ...issue
            };
            return this.issueRepository.update(updatedIssue);
        } catch (error) {
            throw new Error("Error in TicketService.updateTicket()");
        }
    }

    public async delete(issueId: string): Promise<boolean> {
        try {
            return this.issueRepository.delete(issueId);
        } catch (error) {
            throw new Error("Error in TicketService.deleteTicket()");
        }
    }

    public async retrieveAll(): Promise<PersistentIssue[]> {
        try {
            return this.issueRepository.getAll();
        } catch (error) {
            throw new Error("Error in TicketService.getAllTickets()");
        }
    }

    public async processTranscript(transcript: string): Promise<boolean> {
        try {
            //TODO: Let llm process transcript and return xml string
            const testXml = "<meeting name='Sprint Planning Meeting'> <issue nr='1'> <title>User Authentication Feature</title> <story-points> <point> </point> </story-points> <assignee> [Person1] </assignee> <status> In Progress </status> <description>Successfully implemented the user authentication feature. Performance concerns need attention.</description> </issue> <issue nr='2'> <title>Front-end Redesign Integration</title> <story-points> <point>3</point> </story-points> <assignee> [Person2] </assignee> <status> Pending</status> <description>Waiting on API updates from the backend team for full integration. Estimated completion in three days.</description> </issue> <issue nr='3'> <title>Backlog Prioritization</title> <story-points> <point> </point> </story-points> <assignee> [Person3] </assignee> <status> Pending</status> <description>Prioritized backlog items based on user feedback and business requirements. Clarification needed on acceptance criteria.</description> </issue> <issue nr='4'> <title>Technical Debt Resolution</title> <story-points> <point> </point> </story-points> <assignee> [Person4] </assignee> <status> Proposed</status> <description>Proposed dedicating a day to tackle critical technical debt issues and document a plan for ongoing maintenance.</description> </issue> <issue nr='5'> <title>Risk Mitigation</title> <story-points> <point> </point> </story-points> <assignee> [Person5] </assignee> <status> Proposed</status> <description>Identified potential risks related to external dependencies. Proposed setting up regular check-ins with third-party vendors for mitigation.</description> </issue> </meeting>"
            const issues: Issue[] = parseXmlString(testXml)
            const jobs: Promise<Issue>[] = issues.map(async (issue) => {
                return this.create(issue);
            })
            await Promise.all(jobs);

            return true;
        } catch (error: any) {
            throw new Error("Error in TicketService.processTranscript(): " + error.message);
        }
    }
}


export default TicketService;