export class CoreConstants {
    static readonly MAX_RETRY_ATTEMPTS = 3;
    // noinspection JSValidateJSDoc
    /**
     * Timeout collection to meet various needs
     * @type {{xs: number; s: number; m: number; l: number; xl: number; xxl: number; xxxl: number}}
     */
    static readonly TIMEOUTS = {
        xxs: 1000,
        xs: 2000,
        s: 5000,
        m: 10000,
        l: 25000,
        xl: 50000,
        xxl: 75000,
        xxxl: 200000,
        xxxxl: 300000,
        xxxxxl: 400000,
        tenMinutes: 600000,
    };
    static readonly DEFAULT_TIMEOUT = CoreConstants.TIMEOUTS.xl; // default timeout would be greater than allowed unit 'm'
}
