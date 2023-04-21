import {DGameCard, LGameCard, PGameCard} from "@/data/GameCard";
import {ProxyWrapper} from "@/utils/proxy";

export class Card000 extends LGameCard {
    static new(dObj: DGameCard): PGameCard {
        const obj = new Card000(dObj);
        return ProxyWrapper.wrap<PGameCard>(new Proxy(obj, ProxyWrapper.handler<Card000>()));
    }
    getPlay(): void {alert('000');}
}
