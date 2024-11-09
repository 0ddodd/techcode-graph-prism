import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { PokemonEntity } from "./entity/pokemon.entity";
import { Repository } from "typeorm";

@Injectable()
export class PokemonService {
    constructor(
        @InjectRepository(PokemonEntity) private readonly pokemonRepository:
        Repository<PokemonEntity>
    ){}

    async createPokemon(data: any) {
        // pokemonRepository.create()에 name과 type 값을 직접 전달
        const pokemon = this.pokemonRepository.create({
            name: data.name,
            type: data.type,
        });
    
        // 저장 후 반환
        const savedPokemon = await pokemon.save();
        return savedPokemon;
    }
    

    // async deletePokemon(id: string) {
    //     const pokemon = await this.showPokemon(id);
    //     if(pokemon) {
    //         await this.pokemonRepository.delete(id);
    //         return pokemon;
    //     }
    // }

    // async updatePokemon(id: string, data: any) {
    //     const pokemon = await this.showPokemon(id);
    //     if (pokemon) {
    //         pokemon.name = data.name;
    //         pokemon.type = data.type;
    //         await pokemon.save();
    //         return pokemon;
    //     }
    // }

    async showPokemon(id: string) {
        return await this.pokemonRepository.findOne({where:{id}})
    }

    async getAllPokemons() {
        return await this.pokemonRepository.find({})
    }

}