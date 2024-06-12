import { TimestampEntity } from 'src/common/entities/timestamp.entity';
import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
@Index('unique_site_index', ['siteId', 'siteCustomerId'], {
  unique: true,
})
export class Chat extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  siteId: number;

  @Column()
  siteCustomerId: number;
}
