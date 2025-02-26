import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User} from './user.entity';
import { Match } from '../match/match.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Match) private matchesRepository: Repository<Match>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['matchsJoues'] }); // ✅ Correction ici
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['matchsJoues'], 
    });
    if (!user) throw new NotFoundException('Utilisateur non trouvé');
    return user;
  }
}
