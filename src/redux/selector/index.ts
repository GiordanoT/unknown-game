import {DGameCard, LGameCard} from "@/data/GameCard";
import {store} from "@/redux";

export class Selector {
    static getGameCards(): DGameCard[] {
        const objects = store.getState().objects;
        const gameCards = Object.values(objects).filter((obj) => {return obj.classname === LGameCard.name});
        return gameCards as DGameCard[];
    }
}
