import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {SchoolDataSource} from '../datasources';
import {Student, StudentRelations, Classroom} from '../models';
import {ClassroomRepository} from './classroom.repository';

export class StudentRepository extends DefaultCrudRepository<
  Student,
  typeof Student.prototype.id,
  StudentRelations
> {

  public readonly classroom: BelongsToAccessor<Classroom, typeof Student.prototype.id>;

  constructor(
    @inject('datasources.school') dataSource: SchoolDataSource, @repository.getter('ClassroomRepository') protected classroomRepositoryGetter: Getter<ClassroomRepository>,
  ) {
    super(Student, dataSource);
    this.classroom = this.createBelongsToAccessorFor('classroom', classroomRepositoryGetter,);
    this.registerInclusionResolver('classroom', this.classroom.inclusionResolver);
  }
}
