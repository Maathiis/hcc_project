import { MatchEntity } from 'src/match/match.entity';
import { ActualiteEntity } from 'src/actualite/actualite.entity';
import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany} from 'typeorm';

@Entity("user_entity")
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

    @ManyToMany(() => MatchEntity, match => match.users)
    @JoinTable()
    match: MatchEntity[];

    @OneToMany(() => ActualiteEntity, actualite => actualite.auteur)
    actualites: ActualiteEntity[];

    @Column()
    validateUser: boolean;

    @Column({
      type: 'varchar',
      nullable: true, 
    })
    validateToken: string;
}