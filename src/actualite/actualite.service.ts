import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../user/user.entity';
import { Actualite } from './actualite.entity';

@Injectable()
export class ActualiteService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        @InjectRepository(Actualite) private actualiteRepository: Repository<Actualite>,
    ) {}

    // ✅ Créer une actualité (Seuls les contributeurs peuvent publier)
    async createNews(userId: number, titre: string, data: string): Promise<Actualite> {
        const user = await this.usersRepository.findOne({ where: { id: userId } });

        if (!user) {
            throw new NotFoundException('Utilisateur non trouvé');
        }

        if (user.role !== UserRole.CONTRIBUTEUR) {
            throw new ForbiddenException('Seuls les contributeurs peuvent publier des actualités');
        }

        const actu = this.actualiteRepository.create({
            titre,
            data,
            dateActu: new Date(),
            auteur: { id: userId },
        });

        return this.actualiteRepository.save(actu);
    }

    // ✅ Récupérer toutes les actualités
    async getAllNews(): Promise<any[]> {
        const actus = await this.actualiteRepository
            .createQueryBuilder("actualite")
            .leftJoinAndSelect("actualite.auteur", "auteur")
            .select([
                "actualite.id",
                "actualite.titre",
                "actualite.data",
                "actualite.dateActu",
                "auteur.nom",
                "auteur.prenom",
            ])
            .getMany();
    
        if (!actus.length) {
            throw new NotFoundException('Il n\'y a aucune actualité.');
        }
    
        return actus;
    }
    

    // ✅ Récupérer une actualité par ID
    async getNewsById(id: number): Promise<any> {
        const actu = await this.actualiteRepository
            .createQueryBuilder("actualite")
            .leftJoinAndSelect("actualite.auteur", "auteur")
            .select([
                "actualite.id",
                "actualite.titre",
                "actualite.data",
                "actualite.dateActu",
                "auteur.nom",
                "auteur.prenom",
            ])
            .where("actualite.id = :id", { id })
            .getOne();
    
        if (!actu) {
            throw new NotFoundException('Actualité non trouvée');
        }
    
        return actu;
    }
    
}
