'use client';

import { useEffect, useState } from 'react';

import { CardModal } from '@/components/modals/cardModal';
import { ProModal } from '@/components/modals/ProModal';

export const ModalProvider = () => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	return (
		<>
			<CardModal />
			<ProModal />
		</>
	);
};
