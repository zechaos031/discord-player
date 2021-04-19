import { ExtractorModelData } from '../types/types';

class ExtractorModel {
    name: string;
    private _raw: any;

    /**
     * Model for raw Discord Player extractors
     * @param extractorName Name of the extractor
     * @param data Extractor object
     */
    constructor(extractorName: string, data: any) {
        /**
         * The extractor name
         */
        this.name = extractorName;

        Object.defineProperty(this, '_raw', { value: data, configurable: false, writable: false, enumerable: false });
    }

    /**
     * Method to handle requests from `Player.play()`
     * @param query Query to handle
     */
    async handle(query: string): Promise<ExtractorModelData> {
        const data = await this._raw.getInfo(query);
        if (!data) return null;

        return {
            title: data.title,
            duration: data.duration,
            thumbnail: data.thumbnail,
            engine: data.engine,
            views: data.views,
            author: data.author,
            description: data.description,
            url: data.url
        };
    }

    /**
     * Method used by Discord Player to validate query with this extractor
     * @param query The query to validate
     */
    validate(query: string): boolean {
        return Boolean(this._raw.validate(query));
    }

    /**
     * The extractor version
     */
    get version(): string {
        return this._raw.version ?? '0.0.0';
    }

    /**
     * If player should mark this extractor as important
     */
    get important(): boolean {
        return Boolean(this._raw.important);
    }
}

export default ExtractorModel;
export { ExtractorModel };