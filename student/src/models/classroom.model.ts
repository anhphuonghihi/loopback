import {Entity, model, property, hasMany} from '@loopback/repository';
import {Student} from './student.model';

@model()
export class Classroom extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  className: string;

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
