export const revalidate = 60;

import { prisma } from '../../../lib/prisma';
import BoostingPageClient from './page.client';

export const metadata = {
  title: 'Professional Rank Boosting | CS2 & Valorant | SmurfRank',
  description: 'Hire professional Radiant and Global Elite boosters. Fast, secure, and anonymous rank boosting services for Valorant and CS2.',
};

export default async function BoostingPage() {
  const services = await prisma.boostingService.findMany({
    where: { active: true },
    orderBy: { createdAt: 'desc' },
  });

  return <BoostingPageClient services={services} />;
}
