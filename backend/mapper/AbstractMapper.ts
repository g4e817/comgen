export abstract class AbstractMapper {
    public static mapToCore(thirdPartyObject: any): any {
        throw new Error('not implemented');
    }
    public static mapToThirdParty(coreObject: any): any {
        throw new Error('not implemented');
    }
}