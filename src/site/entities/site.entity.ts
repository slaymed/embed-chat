import { TimestampEntity } from 'src/common/entities/timestamp.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('sites')
@Index('unique_site_index', ['domain', 'ownerId'], {
  unique: true,
})
export class Site extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  domain: string;

  @Column()
  ownerId: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'ownerId' })
  owner: User;
}
