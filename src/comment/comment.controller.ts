import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './comment.entity';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async createComment(@Body() body: { text: string; cardId: number }): Promise<Comment> {
    const { text, cardId } = body;
    return this.commentService.createComment(text, cardId);
  }

  @Get(':id')
  async getCommentById(@Param('id') id: number): Promise<Comment> {
    return this.commentService.findCommentById(idcard.service.ts);
  }

  @Delete(':id')
  async deleteComment(@Param('id') id: number): Promise<void> {
    return this.commentService.deleteComment(id);
  }
}
