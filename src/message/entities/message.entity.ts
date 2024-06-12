import { TimestampEntity } from 'src/common/entities/timestamp.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('messages')
export class Message extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  chatId: number;

  @Column()
  content: string;

  @Column()
  senderId: number;

  @Column()
  recipientId: number;
}
