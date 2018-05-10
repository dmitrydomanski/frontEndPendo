export class ICity {
    constructor(
        public name?: string,
        public lat?: number,
        public lng?: number,
        // additional parameter to adjust ISS data to Sunrise data
        public timezone?: number
    ) {

    }
}
