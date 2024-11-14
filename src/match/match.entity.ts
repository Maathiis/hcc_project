import {Column, Entity, PrimaryGeneratedColumn, ManyToMany} from 'typeorm';
import { UserEntity } from 'src/user/user.entity';

@Entity()
export class MatchEntity {
  @PrimaryGeneratedColumn()
    id: number;

    @Column()
    intitule: string;

    @Column()
    dateMatch: Date;

    @ManyToMany(() => UserEntity, user => user.match)
    users: UserEntity[];

    @Column()
    adversaire: string;

    @Column()
    score: number;

    @Column()
    scoreFinal: number;
}