import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async createTask(dto: CreateTaskDto, userId: number): Promise<Task> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('Unauthorized');

    const task = this.taskRepo.create({
      ...dto,
      user,
      karada_test_label: 'KARADA_FULLSTACK_TEST',
      importance_score: dto.priority * 20,
    });
    return this.taskRepo.save(task);
  }

  async getOneTask(taskId: number, userId: number) {
    const task = await this.taskRepo.findOne({
      where: { id: taskId, user: { id: userId } },
      relations: ['user'],
    });

    if (!task) throw new NotFoundException('Task not found');

    return {
      id: task.id,
      username: task.user.username,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      due_date: task.due_date,
      karada_project: task.karada_project,
      karada_test_label: task.karada_test_label,
      importance_score: task.importance_score,
    };
  }

  async getMyTasks(userId: number) {
    const tasks = await this.taskRepo.find({
      where: { userId },
      relations: ['user'],
    });
    return tasks.map((t) => ({
      id: t.id,
      username: t.user.username,
      title: t.title,
      description: t.description,
      status: t.status,
      priority: t.priority,
      due_date: t.due_date,
      karada_project: t.karada_project,
      karada_test_label: t.karada_test_label,
      importance_score: t.importance_score,
    }));
  }

  async updateTask(
    id: number,
    dto: UpdateTaskDto,
    userId: number,
  ): Promise<Task> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('Unauthorized');

    const task = await this.taskRepo.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!task) throw new NotFoundException('Task not found');
    if (task.user.id !== user.id)
      throw new ForbiddenException('You cannot edit this task');

    // Обновляем только разрешённые поля
    if (dto.title !== undefined) task.title = dto.title;
    if (dto.description !== undefined) task.description = dto.description;
    if (dto.status !== undefined) task.status = dto.status;
    if (dto.priority !== undefined) {
      task.priority = dto.priority;
      task.importance_score = dto.priority * 20;
    }
    if (dto.due_date !== undefined) task.due_date = dto.due_date;
    if (dto.karada_project !== undefined)
      task.karada_project = dto.karada_project;

    // karada_test_label игнорируем — фронт не может его менять

    return this.taskRepo.save(task);
  }

  async deleteTask(userId: number, taskId: number) {
    const task = await this.taskRepo.findOne({
      where: {
        id: taskId,
        user: { id: userId },
      },
    });
    if (!task) throw new NotFoundException('Not found :(');

    return await this.taskRepo.remove(task);
  }
}
