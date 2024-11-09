import { ObjectType, Field } from '@nestjs/graphql';
import { LeagueEntity } from "src/league/entity/league.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()  // 이 데코레이터를 추가하여 GraphQL 객체 타입으로 사용 가능하게 합니다.
@Entity('pokemon')
export class PokemonEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field()  // GraphQL 필드로 설정
    id: string;

    @Column('varchar', {length: 500, unique: true})
    @Field()  // GraphQL 필드로 설정
    name: string;

    @Column('varchar', {length: 500})
    @Field()  // GraphQL 필드로 설정
    type: string;

    @ManyToOne(type => LeagueEntity, league => league.pokemons, {
        eager: true,
    })
    @Field(() => LeagueEntity)  // LeagueEntity와 연결되어 있으므로 해당 타입도 명시
    league: LeagueEntity;
}
