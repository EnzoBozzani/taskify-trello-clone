'use server';

import { auth } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';
import { ENTITY_TYPE, ACTION } from '@prisma/client';

import { createAuditLog } from '@/lib/createAuditLog';
import { db } from '@/lib/db';
import { createSafeAction } from '@/lib/createSafeAction';

import { InputType, ReturnType } from './types';
import { UpdateCard } from './schema';

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth();

	if (!userId || !orgId) {
		return {
			error: 'Unauthorized',
		};
	}

	const { id, boardId, ...values } = data;
	let card;

	try {
		card = await db.card.update({
			where: {
				id,
				list: {
					board: {
						orgId,
					},
				},
			},
			data: {
				...values,
			},
		});

		await createAuditLog({
			entityTitle: card.title,
			entityId: card.id,
			entityType: ENTITY_TYPE.CARD,
			action: ACTION.UPDATE,
		});
	} catch (error) {
		return {
			error: 'Failed to update.',
		};
	}

	revalidatePath(`/board/${boardId}`);

	return { data: card };
};

export const updateCard = createSafeAction(UpdateCard, handler);
