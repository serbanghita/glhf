import Entity from "./Entity";
import System from "./System";
import Query, {IQueryFilters} from "./Query";
import Component from "./Component";
import { hasBit } from "../../glhf-bitmask/src/bitmask";

export default class World {
    public queries = new Map<string, Query>();
    public entities = new Map<string, Entity>();
    public systems = new Map<string, System>();

    public createQuery(id: string, filters: IQueryFilters): Query
    {
        const query = new Query(this, id, filters);

        if (this.queries.has(query.id)) {
            throw new Error(`A query with the id "${query.id}" already exists.`);
        }

        this.queries.set(query.id, query);

        query.init();

        return query;
    }

    public removeQuery(id: string)
    {
        this.queries.delete(id);
    }

    public getQuery(id: string): Query
    {
        const query = this.queries.get(id);
        if (!query) {
            throw new Error(`There is not query registered with the id: ${id}.`);
        }
        return query;
    }

    public createEntity(id: string): Entity {
        if (this.entities.has(id)) {
            throw new Error(`Entity with the id "${id}" already exists.`);
        }

        const entity = new Entity(this, id);

        this.entities.set(entity.id, entity);
        this.notifyQueriesOfEntityCandidacy(entity);

        return entity;
    }

    public getEntity(id: string)
    {
        return this.entities.get(id);
    }

    public removeEntity(id: string) {
        const entity = this.entities.get(id);

        if (!entity) {
            return;
        }

        this.notifyQueriesOfEntityRemoval(entity);
    }

    public notifyQueriesOfEntityCandidacy(entity: Entity) {
        this.queries.forEach((query) => {
            query.candidate(entity);
        });
    }

    public notifyQueriesOfEntityRemoval(entity: Entity) {
        for (const id in this.queries) {
            if (this.queries.has(id)) {
                this.queries.get(id)?.remove(entity);
            }
        }
    }

    /**
     * 1. Finds all Queries that have the Component in their filter.
     * 2. Add candidacy of the Entity to the list of Entities inside the Query.
     *
     * @param entity
     * @param component
     */
    public notifyQueriesOfEntityComponentAddition(entity: Entity, component: Component)
    {
        this.queries.forEach(query => {
            if (hasBit(query.all, component.bitmask)) {
                query.add(entity);
            }
        });
    }

    /**
     * 1. Finds all Queries that have the Component in their filter.
     * 2. Remove the Entity from the list of Entities inside the Query.
     *
     * @param entity
     * @param component
     */
    public notifyQueriesOfEntityComponentRemoval(entity: Entity, component: Component)
    {
        this.queries.forEach(query => {
            if (hasBit(query.all, component.bitmask)) {
                query.remove(entity);
            }
        });
    }
}