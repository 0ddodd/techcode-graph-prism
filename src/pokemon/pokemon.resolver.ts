import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PokemonService } from './pokemon.service';
import { PokemonEntity } from './entity/pokemon.entity';

@Resolver(of => PokemonEntity)
export class PokemonResolver {
    constructor(private readonly pokemonService: PokemonService) {}

    @Query(() => [PokemonEntity])
    async pokemons() {
        return await this.pokemonService.getAllPokemons();
    }
    
    @Query(() => PokemonEntity) 
    async pokemon(@Args('id') id: string) {
        return await this.pokemonService.showPokemon(id);
    }

    // @Mutation(() => Boolean)
    // async delete(@Args('id') id: string) {
    //     await this.pokemonService.deletePokemon(id);
    //     return {delete: true}
    // }

    // @Mutation(() => PokemonEntity)
    // async create(@Args('name') name: string, @Args('type') type: string){
    //     return this.pokemonService.createPokemon({name, type});
    // }
}
