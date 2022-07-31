import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Classroom,
  Student,
} from '../models';
import {ClassroomRepository} from '../repositories';

export class ClassroomStudentController {
  constructor(
    @repository(ClassroomRepository) protected classroomRepository: ClassroomRepository,
  ) { }

  @get('/classrooms/{id}/students', {
    responses: {
      '200': {
        description: 'Array of Classroom has many Student',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Student)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Student>,
  ): Promise<Student[]> {
    return this.classroomRepository.students(id).find(filter);
  }

  @post('/classrooms/{id}/students', {
    responses: {
      '200': {
        description: 'Classroom model instance',
        content: {'application/json': {schema: getModelSchemaRef(Student)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Classroom.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Student, {
            title: 'NewStudentInClassroom',
            exclude: ['id'],
            optional: ['classroomId']
          }),
        },
      },
    }) student: Omit<Student, 'id'>,
  ): Promise<Student> {
    return this.classroomRepository.students(id).create(student);
  }

  @patch('/classrooms/{id}/students', {
    responses: {
      '200': {
        description: 'Classroom.Student PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Student, {partial: true}),
        },
      },
    })
    student: Partial<Student>,
    @param.query.object('where', getWhereSchemaFor(Student)) where?: Where<Student>,
  ): Promise<Count> {
    return this.classroomRepository.students(id).patch(student, where);
  }

  @del('/classrooms/{id}/students', {
    responses: {
      '200': {
        description: 'Classroom.Student DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Student)) where?: Where<Student>,
  ): Promise<Count> {
    return this.classroomRepository.students(id).delete(where);
  }
}
