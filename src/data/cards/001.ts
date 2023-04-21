import {DGameCard, LGameCard, PGameCard} from "@/data/GameCard";
import {ProxyWrapper} from "@/utils/proxy";

export class Card001 extends LGameCard {
    static new(dObj: DGameCard): PGameCard {
        const obj = new Card001(dObj);
        return ProxyWrapper.wrap<PGameCard>(new Proxy(obj, ProxyWrapper.handler<Card001>()));
    }
    getPlay(): void {alert('001');}
}
