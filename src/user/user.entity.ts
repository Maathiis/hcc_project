import { MatchEntity } from 'src/match/match.entity';
import { ActualiteEntity } from 'src/actualite/actualite.entity';
import {BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany} from 'typeorm';
import * as bcrypt from 'bcrypt';

export enum UserRole {
    NONVERIFIE = 'nonverifie',
    COACH = 'coach',
    JOUEUR = 'joueur',
    CONTRIBUTEUR = 'contributeur',
    ADMIN = 'admin',
}

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @Column()
    prenom: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({
      type: 'varchar',
      enum: UserRole,  
      default: UserRole.NONVERIFIE, // Valeur par défaut avant confirmation du club
    })
    role: UserRole;
    

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
    
    

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
        this.password = await bcrypt.hash(this.password, 10);
        }
    }
}

