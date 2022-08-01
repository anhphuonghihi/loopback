import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Student,
  Classroom,
} from '../models';
import {StudentRepository} from '../repositories';

export class StudentClassroomController {
  constructor(
    @repository(StudentRepository)
    public studentRepository: StudentRepository,
  ) { }

  @get('/students/{id}/classroom', {
    responses: {
      '200': {
        description: 'Classroom belonging to Student',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Classroom)},
          },
        },
      },
    },
  })
  async getClassroom(
    @param.path.string('id') id: typeof Student.prototype.id,
  ): Promise<Classroom> {
    return this.studentRepository.classroom(id);
  }
}
