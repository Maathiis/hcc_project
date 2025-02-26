import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Unique } from 'typeorm';
import { User } from 'src/user/user.entity';
import { UserMatch } from 'src/user-match/user-match.entity'; 

@Entity("match")
@Unique(['dateMatch'])
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  intitule: string;

  @Column({ type: 'date' })
  dateMatch: Date;

  @Column()
  adversaire: string;

  @Column({ default: '0-0' })
  score: string;
  
  @Column({ nullable: true })
  scoreFinal: string; 

  @ManyToOne(() => User, (user) => user.matchesEntraine, { eager: true }) 
  coach: User;

  @OneToMany(() => UserMatch, (userMatch) => userMatch.match)
  userMatches: UserMatch[];
}
