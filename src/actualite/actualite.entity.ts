import { UserEntity } from 'src/user/user.entity';
import {Column, Entity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

@Entity()
export class ActualiteEntity {
  @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titre: string;

    @Column()
    data: string;

    @Column()
    dateActu: Date;

    @ManyToOne(() => UserEntity, user => user.actualites, { eager: true, nullable: false })
    auteur: UserEntity;
}