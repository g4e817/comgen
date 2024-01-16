import { Issue } from "./Issue";
import { Product } from "./Product";
import { User } from "./User";

interface AbstractPersistedModel {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface PersistentUser extends AbstractPersistedModel, User { }
export interface PersistentIssue extends AbstractPersistedModel, Issue { }
export interface PersistentProduct extends AbstractPersistedModel, Product { }
