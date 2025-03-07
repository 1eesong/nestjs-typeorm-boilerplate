import { BaseEntity } from 'src/common/entities/base.entity';
import { Post } from 'src/modules/posts/entities/post.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Post, (post) => post.user, {
    cascade: ['insert', 'soft-remove', 'recover'],
  })
  posts: Post[];
}
