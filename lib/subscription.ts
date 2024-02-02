import { auth } from '@clerk/nextjs';

import { db } from './db';

const DAY_IN_MS = 84_400_000;

export const checkSubscription = async () => {
	const { orgId } = auth();

	if (!orgId) return false;

	const orgSub = await db.orgSubscription.findUnique({
		where: { orgId },
		select: {
			stripeCurrentPeriodEnd: true,
			stripeCustomerId: true,
			stripePriceId: true,
			stripeSubscriptionId: true,
		},
	});

	if (!orgSub) return false;

	const isValid = orgSub.stripePriceId && orgSub.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

	return !!isValid;
};
