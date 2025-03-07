import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}
  async createPost(createPostDto: CreatePostDto) {
    const post = this.postRepository.create(createPostDto);
    await this.postRepository.save(post);
  }
  async findAllPosts(): Promise<Post[]> {
    return await this.postRepository.find();
  }
  async findPostById(id: string): Promise<Post> {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) throw new NotFoundException('게시글을 찾을 수 없습니다.');
    return post;
  }
}
