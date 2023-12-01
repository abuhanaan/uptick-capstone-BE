import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}
  async getStats(): Promise<Object> {
    // const programApplications = await this.prisma.application.count();
    const apps = await this.prisma.application.findMany();

    const stats = {
      programApplicants: 0,
      acceptedprogramApplications: 0,
      rejectedprogramApplications: 0,
      pendingprogramApplications: 0,
      jobApplicants: 0,
      acceptedJobApplications: 0,
      rejectedJobApplications: 0,
      pendingJobApplications: 0,
      startups: 0,
      acceptedStartupApplications: 0,
      rejectedStartupApplications: 0,
      pendingStartupApplications: 0,
    };

    apps.map((app) => {
      if (app.type === 'program') {
        stats.programApplicants += 1;
        if (app.type === 'program' && app.status === 'accepted') {
          stats.acceptedprogramApplications += 1;
        }
        if (app.type === 'program' && app.status === 'pending') {
          stats.pendingprogramApplications += 1;
        }
        if (app.type === 'program' && app.status === 'rejected') {
          stats.rejectedprogramApplications += 1;
        }
      }
      if (app.type === 'job') {
        stats.jobApplicants += 1;
        if (app.type === 'job' && app.status === 'accepted') {
          stats.acceptedJobApplications += 1;
        }
        if (app.type === 'job' && app.status === 'pending') {
          stats.pendingJobApplications += 1;
        }
        if (app.type === 'job' && app.status === 'rejected') {
          stats.rejectedJobApplications += 1;
        }
      }
      if (app.type === 'startup') {
        stats.programApplicants += 1;
        if (app.type === 'startup' && app.status === 'accepted') {
          stats.acceptedStartupApplications += 1;
        }
        if (app.type === 'startup' && app.status === 'pending') {
          stats.pendingStartupApplications += 1;
        }
        if (app.type === 'startup' && app.status === 'rejected') {
          stats.rejectedStartupApplications += 1;
        }
      }
    });

    const recentApplicants = await this.prisma.application.findMany({
      orderBy: { createdAt: 'desc' },
      take: 3,
    });

    const recentJobs = await this.prisma.job.findMany({
      orderBy: { createdAt: 'desc' },
      take: 3,
    });
    return { stats, recentApplicants, recentJobs };
  }
}
