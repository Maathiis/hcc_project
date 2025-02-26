import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../user/user.entity';
import { Match } from './match.entity';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Match) private matchesRepository: Repository<Match>,
  ) {}

  async createMatch(coachId: number, intitule: string, dateMatch: Date, adversaire: string): Promise<Match> {
    const coach = await this.usersRepository.findOne({ where: { id: coachId } });

    if (!coach) {
        throw new NotFoundException('Coach non trouvé');
    }

    if (coach.role !== UserRole.COACH) {
        throw new ForbiddenException('Seuls les coachs peuvent créer des matchs');
    }

    const existingMatch = await this.matchesRepository.findOne({ where: { dateMatch } });
    if (existingMatch) {
        throw new ForbiddenException('Un match est déjà prévu à cette date');
    }

    const match = this.matchesRepository.create({ intitule, dateMatch, adversaire, coach });
    return this.matchesRepository.save(match);
}


  async updateMatch(coachId: number, id: number, score: string, scoreFinal: string): Promise<Match> {
    const coach = await this.usersRepository.findOne({ where: { id: coachId } });
    if (!coach) throw new NotFoundException('Coach non trouvé');
    if (coach.role !== UserRole.COACH) throw new ForbiddenException('Seuls les coachs peuvent modifier des matchs');
    
    const match = await this.matchesRepository.findOne({ where: { id } });
    if (!match) throw new NotFoundException('Match non trouvé');

    match.score = score;
    match.scoreFinal = scoreFinal;
    return this.matchesRepository.save(match);
  }

  async getAllMatchs(): Promise<any[]> {
    const matches = await this.matchesRepository
        .createQueryBuilder("match")
        .leftJoinAndSelect("match.coach", "coach")
        .leftJoinAndSelect("match.userMatches", "userMatches")  // Jointure avec UserMatch
        .leftJoinAndSelect("userMatches.user", "joueurs") // Récupère les joueurs via UserMatch
        .select([
            "match.id",
            "match.intitule",
            "match.dateMatch",
            "match.adversaire",
            "match.score",
            "match.scoreFinal",
            "coach.nom",
            "coach.prenom",
            "joueurs.nom",
            "joueurs.prenom",
        ])
        .getMany();

    if (!matches.length) {
        throw new NotFoundException("Il n'y a aucun match disponible.");
    }

    return matches;
  }


  async getOneMatch(id: number): Promise<any> {
    const match = await this.matchesRepository
        .createQueryBuilder("match")
        .leftJoinAndSelect("match.coach", "coach")
        .leftJoinAndSelect("match.userMatches", "userMatches")  // Jointure avec UserMatch
        .leftJoinAndSelect("userMatches.user", "joueurs") // Récupère les joueurs via UserMatch
        .select([
            "match.id",
            "match.intitule",
            "match.dateMatch",
            "match.adversaire",
            "match.score",
            "match.scoreFinal",
            "coach.nom",
            "coach.prenom",
            "joueurs.nom",
            "joueurs.prenom",
        ])
        .where("match.id = :id", { id })
        .getOne();

    if (!match) {
        throw new NotFoundException("Match non trouvé");
    }

    return match;
  }


}


