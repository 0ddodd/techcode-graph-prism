import { ObjectType, Field } from '@nestjs/graphql';
import { PokemonEntity } from "src/pokemon/entity/pokemon.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()  // GraphQL 객체 타입으로 지정
@Entity('league')
export class LeagueEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field()  // GraphQL 필드로 지정
    id: string;

    @Column('varchar', { length: 500, unique: true })
    @Field()  // GraphQL 필드로 지정
    name: string;

    @OneToMany(type => PokemonEntity, pokemon => pokemon.league)
    @Field(() => [PokemonEntity])  // `pokemons` 필드를 배열 형태로 지정
    pokemons: PokemonEntity[];
}
