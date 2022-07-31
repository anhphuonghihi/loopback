import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Classroom} from '../models';
import {ClassroomRepository} from '../repositories';

export class ClassNameController {
  constructor(
    @repository(ClassroomRepository)
    public classroomRepository : ClassroomRepository,
  ) {}

  @post('/classrooms')
  @response(200, {
    description: 'Classroom model instance',
    content: {'application/json': {schema: getModelSchemaRef(Classroom)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Classroom, {
            title: 'NewClassroom',
            exclude: ['id'],
          }),
        },
      },
    })
    classroom: Omit<Classroom, 'id'>,
  ): Promise<Classroom> {
    return this.classroomRepository.create(classroom);
  }

  @get('/classrooms/count')
  @response(200, {
    description: 'Classroom model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Classroom) where?: Where<Classroom>,
  ): Promise<Count> {
    return this.classroomRepository.count(where);
  }

  @get('/classrooms')
  @response(200, {
    description: 'Array of Classroom model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Classroom, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Classroom) filter?: Filter<Classroom>,
  ): Promise<Classroom[]> {
    return this.classroomRepository.find(filter);
  }

  @patch('/classrooms')
  @response(200, {
    description: 'Classroom PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Classroom, {partial: true}),
        },
      },
    })
    classroom: Classroom,
    @param.where(Classroom) where?: Where<Classroom>,
  ): Promise<Count> {
    return this.classroomRepository.updateAll(classroom, where);
  }

  @get('/classrooms/{id}')
  @response(200, {
    description: 'Classroom model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Classroom, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Classroom, {exclude: 'where'}) filter?: FilterExcludingWhere<Classroom>
  ): Promise<Classroom> {
    return this.classroomRepository.findById(id, filter);
  }

  @patch('/classrooms/{id}')
  @response(204, {
    description: 'Classroom PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Classroom, {partial: true}),
        },
      },
    })
    classroom: Classroom,
  ): Promise<void> {
    await this.classroomRepository.updateById(id, classroom);
  }

  @put('/classrooms/{id}')
  @response(204, {
    description: 'Classroom PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() classroom: Classroom,
  ): Promise<void> {
    await this.classroomRepository.replaceById(id, classroom);
  }

  @del('/classrooms/{id}')
  @response(204, {
    description: 'Classroom DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.classroomRepository.deleteById(id);
  }
}
