import { PokemonEntity } from "src/pokemon/entity/pokemon.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('league')
export class LeagueEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid') id: string;

    @Column('varchar', { length: 500, unique: true})
    name: string;

    @OneToMany(type => PokemonEntity, pokemon => pokemon.league)
    pokemons: PokemonEntity[];
}