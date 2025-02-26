import { Match } from 'src/match/match.entity';
import { Actualite } from 'src/actualite/actualite.entity';
import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany} from 'typeorm';

@Entity("user")
export class AuthEntity {
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

    @Column({ default: 'nonverifie' })
    role: string;

    @CreateDateColumn()
    dateInscription: Date;

    @UpdateDateColumn()
    dateModification: Date;

    @ManyToMany(() => Match, match => match.userMatches)
    @JoinTable()
    match: Match[];

    @OneToMany(() => Actualite, actualite => actualite.auteur)
    actualites: Actualite[];

    @Column()
    validateUser: boolean;

    @Column({
      type: 'varchar',
      nullable: true, 
    })
    validateToken: string;
}