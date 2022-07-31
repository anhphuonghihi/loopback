import {Entity, model, property, hasMany} from '@loopback/repository';
import {Student} from './student.model';

@model()
export class Classroom extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  className: string;

  @property({
    type: 'string',
    required: true,
  })
  teacher: string;

  @property({
    type: 'string',
    required: true,
  })
  year: string;

  @hasMany(() => Student)
  students: Student[];

  constructor(data?: Partial<Classroom>) {
    super(data);
  }
}

export interface ClassroomRelations {
  // describe navigational properties here
}

export type ClassroomWithRelations = Classroom & ClassroomRelations;
