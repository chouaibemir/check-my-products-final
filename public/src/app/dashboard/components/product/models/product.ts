import { Topic } from './topic';

export class Product {
    id: Number;
    name: string;
    tagline: string;
    day: string;
    created_at: string;
    votes_count: Number;
    topics: Topic[];
}
