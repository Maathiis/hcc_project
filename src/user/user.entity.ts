import { Match } from 'src/match/match.entity';
import { Actualite } from 'src/actualite/actualite.entity';
import { UserMatch } from 'src/user-match/user-match.entity';
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';

export enum UserRole {
    NONVERIFIE = 'nonverifie',
    COACH = 'coach',
    JOUEUR = 'joueur',
    CONTRIBUTEUR = 'contributeur',
    ADMIN = 'admin',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @Column()
    prenom: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({
      type: 'varchar',
      enum: UserRole,  
      default: UserRole.NONVERIFIE,
    })
    role: UserRole;

    @CreateDateColumn()
    dateInscription: Date;

    @UpdateDateColumn()
    dateModification: Date;

    @OneToMany(() => Actualite, actualite => actualite.auteur)
    actualites: Actualite[];

    @Column({ default: false }) // Ajout d'une valeur par défaut
    validateUser: boolean;

    @Column({ type: 'varchar', nullable: true })
    validateToken: string;

    // ✅ Un coach peut entraîner plusieurs matchs
    @OneToMany(() => Match, (match) => match.coach)
    matchesEntraine: Match[];

    @OneToMany(() => UserMatch, (userMatch) => userMatch.user)
    userMatches: UserMatch[];

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }
}
