import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async createComment(text: string, cardId: number): Promise<Comment> {
    const comment = this.commentRepository.create({ text, card: { id: cardId } });
    return this.commentRepository.save(comment);

  }

  async findCommentById(id: number): Promise<Comment> {
    return this.commentRepository.findOne({ where: { id }, relations: ['card'] });
  }

  async deleteComment(id: number): Promise<void> {
    await this.commentRepository.delete(id);
  }
}
