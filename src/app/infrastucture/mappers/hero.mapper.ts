import { Hero } from "../../domain/models/hero";
import { HeroDTO } from "../dto/hero.dto";

export class HeroMapper {
    static fromApiToDomain({ id, superhero, publisher, alter_ego, first_appearance, characters }: HeroDTO): Hero {
        return {
            id,
            superhero,
            publisher,
            alter_ego,
            first_appearance,
            characters,



        };
    }

    static fromDomainToApi({ id, superhero, publisher, alter_ego, first_appearance, characters }: Hero): HeroDTO {
        return {
            id,
            superhero,
            publisher,
            alter_ego,
            first_appearance,
            characters,
        };
    }
}