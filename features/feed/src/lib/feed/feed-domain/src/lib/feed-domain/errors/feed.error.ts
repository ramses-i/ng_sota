export class FeedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "FeedError";
    }
}
