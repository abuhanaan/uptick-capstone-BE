import { Prisma } from '@prisma/client';

export class Job implements Prisma.JobUncheckedCreateInput {
  id: number;
  title: string;
  description: string;
  requirements: string;
  applicationFormLink: string;
  companyLogo: string;
  applicationDeadline: string | Date;
  startDate: string | Date;
  endDate: string | Date;
}
