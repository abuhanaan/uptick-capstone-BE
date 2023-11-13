import { Program } from '@prisma/client';

export class ProgramEntity {
  id: number;
  name: string;
  description: string;
  type: string;
  curriculumOutline: string[];
  objectives: string;
  benefits: string;
  prerequisites: string;
  duration: string;
  applicationFormLink: string;
  enrollmentInformation: string;
  startDate: Date;
  endDate: Date;

  constructor(program: Program) {
    this.id = program.id;
    this.name = program.name;
    this.description = program.description;
    this.type = program.type;
    this.curriculumOutline = program.curriculumOutline;
    this.objectives = program.objectives;
    this.benefits = program.benefits;
    this.prerequisites = program.prerequisites;
    this.duration = program.duration;
    this.applicationFormLink = program.applicationFormLink;
    this.enrollmentInformation = program.enrollmentInformation;
    this.startDate = program.startDate;
    this.endDate = program.endDate;
  }
}
