import fs from 'fs';
import path from 'path';
import { AbstractRepository } from './AbstractRepository';
import { Issue } from '../../types/Issue';
import { PersistentIssue } from '../../types/Models';
import { generateUniqueId } from '../../helper';
import { config } from '../config/config';


class IssueRepository implements AbstractRepository<Issue, PersistentIssue> {

    public entity = 'tickets';
    protected dataFolderPath: string;


    constructor() {
        this.dataFolderPath = path.resolve(config.currentWorkingDirectory + `/data/${this.entity}.json`);
    }

    public getOne(id: string): PersistentIssue | undefined {
        const issues = this.getAll();

        return issues.find(issue => issue.id === id);
    }

    public getAll(): PersistentIssue[] {
        const issuesData = fs.readFileSync(path.join(this.dataFolderPath), 'utf-8');
        const issues = JSON.parse(issuesData) as PersistentIssue[];
        return issues;
    }

    public create(issue: Issue): PersistentIssue {
        const id = generateUniqueId();
        const newIssue = {
            ...issue,
            id,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const issues = this.getAll()
        issues.push(newIssue);
        fs.writeFileSync(this.dataFolderPath, JSON.stringify(issues));
        return newIssue;
    }

    public update(entity: PersistentIssue): PersistentIssue {
        const issues = this.getAll();
        const index = issues.findIndex(u => u.id === entity.id);
        const updatedIssue = {
            ...entity,
            updatedAt: new Date()
        };

        issues[index] = updatedIssue;
        fs.writeFileSync(this.dataFolderPath, JSON.stringify(issues));
        return updatedIssue;
    }

    public delete(id: string): boolean {
        const issues = this.getAll();
        const index = issues.findIndex(u => u.id === id);
        issues.splice(index, 1);
        fs.writeFileSync(this.dataFolderPath, JSON.stringify(issues));
        return true;
    }
};

export default IssueRepository;