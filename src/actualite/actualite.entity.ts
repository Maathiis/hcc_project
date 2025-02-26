import { User } from 'src/user/user.entity';
import {Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn} from 'typeorm';

@Entity("actualite")
export class Actualite {
  @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titre: string;

    @Column({ type: 'text' })
    data: string;

    @CreateDateColumn()
    dateActu: Date;

    @ManyToOne(() => User, (user) => user.actualites, { eager: true })
    auteur: User;
}