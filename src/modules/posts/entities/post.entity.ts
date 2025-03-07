import { BaseEntity } from 'src/common/entities/base.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Post extends BaseEntity {
  @Column()
  title: string;

  @Column({ unique: true })
  content: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
