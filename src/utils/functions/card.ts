import {PGameCard} from "@/data/GameCard";
import {Card000} from "@/data/cards/000";
import {Card001} from "@/data/cards/001";

export class UCard {
    static converter(card: PGameCard): PGameCard {
        switch(card.code) {
            case 0: return Card000.new(card.raw);
            case 1: return Card001.new(card.raw);
            default: return card;
        }
    }
}
