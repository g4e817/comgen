import fs from 'fs';
import path from 'path';

export abstract class AbstractRepository<T, Z> {

    public abstract getOne(id: string): Z | undefined

    public abstract getAll(): Z[]

    public abstract create(entity: T): Z

    public abstract update(entity: Z): Z

    public abstract delete(id: string): boolean

}