import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {SchoolDataSource} from '../datasources';
import {Classroom, ClassroomRelations, Student} from '../models';
import {StudentRepository} from './student.repository';

export class ClassroomRepository extends DefaultCrudRepository<
  Classroom,
  typeof Classroom.prototype.id,
  ClassroomRelations
> {

  public readonly students: HasManyRepositoryFactory<Student, typeof Classroom.prototype.id>;

  constructor(
    @inject('datasources.school') dataSource: SchoolDataSource, @repository.getter('StudentRepository') protected studentRepositoryGetter: Getter<StudentRepository>,
  ) {
    super(Classroom, dataSource);
    this.students = this.createHasManyRepositoryFactoryFor('students', studentRepositoryGetter,);
    this.registerInclusionResolver('students', this.students.inclusionResolver);
  }
}
