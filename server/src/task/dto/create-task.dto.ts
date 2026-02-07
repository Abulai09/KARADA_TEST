import {
  IsEnum,
  IsOptional,
  IsString,
  IsNumber,
  Min,
  Max,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(['new', 'in_progress', 'done', 'archived'])
  status?: 'new' | 'in_progress' | 'done' | 'archived';

  @IsNumber()
  @Min(1)
  @Max(5)
  priority: number;

  @IsOptional()
  due_date?: Date;

  @IsEnum(['karada_u', 'prohuntr', 'other'])
  karada_project: 'karada_u' | 'prohuntr' | 'other';
}
