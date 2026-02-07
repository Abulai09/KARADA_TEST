import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/JwtGuard';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createTask(@Body() dto: CreateTaskDto, @Req() req) {
    const userId = req.user.id;
    return await this.taskService.createTask(dto, userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getMy(@Req() req) {
    const userId = req.user.id;
    return await this.taskService.getMyTasks(userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getOne(@Req() req, @Param('id') id: number) {
    const userId = req.user.id;
    return await this.taskService.getOneTask(id, userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateTsk(
    @Req() req,
    @Param('id') id: number,
    @Body() dto: UpdateTaskDto,
  ) {
    const userId = req.user.id;
    return await this.taskService.updateTask(id, dto, userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delTsk(@Req() req, @Param('id') id: number) {
    const userId = req.user.id;
    return await this.taskService.deleteTask(userId, id);
  }
}
