import { Injectable, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../user/user.entity';
import { Match } from '../match/match.entity';
import { UserMatch } from './user-match.entity';


@Injectable()
export class UserMatchService {
  constructor(
    @InjectRepository(UserMatch)
    private readonly userMatchRepository: Repository<UserMatch>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
  ) {}

  async inscrireUserAuMatch(userId: number, matchId: number): Promise<UserMatch> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('Utilisateur non trouvé');

    if (user.role !== UserRole.JOUEUR) {
      throw new ForbiddenException("Seuls les joueurs peuvent s'inscrire aux matchs");
    }

    const match = await this.matchRepository.findOne({ where: { id: matchId } });
    if (!match) throw new NotFoundException('Match non trouvé');

    const existingUserMatch = await this.userMatchRepository.findOne({
      where: { user: { id: userId }, match: { id: matchId } },
    });

    if (existingUserMatch) throw new ConflictException('Utilisateur déjà inscrit à ce match');

    const userMatch = this.userMatchRepository.create({
      user,
      match,
      dateInscription: new Date(),
    });

    return await this.userMatchRepository.save(userMatch);
  }

  async desinscrireUserDuMatch(userId: number, matchId: number): Promise<void> {
    const userMatch = await this.userMatchRepository.findOne({
      where: { user: { id: userId }, match: { id: matchId } },
    });

    if (!userMatch) throw new NotFoundException('Inscription non trouvée');

    await this.userMatchRepository.remove(userMatch);
  }

  async getAllUsersWithMatches(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['userMatches', 'userMatches.match'],
    });
  }

  async getUserWithMatches(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['userMatches', 'userMatches.match'],
    });

    if (!user) throw new NotFoundException('Utilisateur non trouvé');

    return user;
  }
}
