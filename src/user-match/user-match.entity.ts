import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Match } from 'src/match/match.entity';
import { User } from 'src/user/user.entity';


@Entity()
export class UserMatch {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userMatches)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Match, (match) => match.userMatches)
  @JoinColumn({ name: 'matchId' })
  match: Match;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  dateInscription: Date;
}
